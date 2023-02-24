const db = require("../db/connection")
const {fetchUsers} = require ("./user-models")
const {fetchCategories} = require ("./category-models")
const format = require ("pg-format")


function fetchReviews () {

    return db.query(`SELECT * FROM reviews;`)
    .then(({rows}) => {
        return rows
    })

}

function fetchReviewsCommentCount (sort_by = "created_at", order = "DESC", category = null, limit = null, p = null) {
    

    return fetchCategories()
    .then((categories) => {
        return categories.map((category) => {
            return category.slug
        })
    }).then((slugs) => {

        const validSortByOptions = ["title", "designer", "owner", "category", "votes", "created_at", "review_id", "comment_count"]
        const validOrderOptions = ["DESC", "ASC"]
    
        if (!validSortByOptions.includes(sort_by)) {
            return Promise.reject("Bad request.")
        }
    
        if (!validOrderOptions.includes(order)) {
            return Promise.reject("Bad request.")
        }
    
        let queryString = `
        SELECT reviews.*, COUNT(comments.review_id) AS comment_count
        FROM reviews
        LEFT JOIN comments ON reviews.review_id = comments.review_id `
    
        if (category) {
            category = category.replace(/_/g, " ")
            
            if (slugs.includes(category)) {

                category = category.replace(/'/g, "''")
                queryString += `WHERE category = \'${category}\' `    
            }
            else {
                return Promise.reject("Item not found.")
            }
        }
    
        queryString += `GROUP BY reviews.review_id `
        queryString += `ORDER BY ${sort_by} ${order} `

        if (limit) {

            if (/\D/.test(parseInt(limit)) || (/\D/.test(parseInt(p)) && p !== null)) {
                return Promise.reject("Bad request.")
            }

            queryString += `LIMIT ${limit}`

            if (p) {

                queryString += ` OFFSET ${(p - 1) * limit}`

            }
        }

        queryString += `;`
    
        return db.query(queryString)
        .then(({rows}) => {
    
            for (let i in rows) {
                rows[i].comment_count = parseInt(rows[i].comment_count)
            }
            return rows
    
        })
    })
}

function fetchReviewById (review_id) {

    return db.query(`
        SELECT reviews.*, COUNT(comments.review_id) AS comment_count
        FROM reviews
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id`,
    [review_id])
    .then((result) => {
        if (result.rows.length < 1) {
            return Promise.reject("Item not found.")
        }
        else {
            result.rows[0].comment_count = parseInt(result.rows[0].comment_count)
            return result.rows[0]
        }
    })

}

function addReview (review_obj) {

    if (review_obj.hasOwnProperty("owner") === false || review_obj.hasOwnProperty("review_body") === false || review_obj.hasOwnProperty("title") === false || review_obj.hasOwnProperty("designer") === false || review_obj.hasOwnProperty("category") === false) {
    
        return Promise.reject("Request incomplete.")
    }


    return fetchCategories().then((categories) => {
        const slugs = categories.map((category) => {
            return category.slug
        })
        if (!slugs.includes(review_obj.category)) {
            return Promise.reject("Bad request.")
        }
    })
    .then(() => {

        return fetchUsers().then((result) => {


            
            const filtered = result.filter((user) => {
                if (user.username === review_obj.owner) {
                    return user
                }
            })

            if (filtered.length === 0) {
                return Promise.reject("Username does not exist.")
            }
        })

    })
    .then(() => {



        const formatStr = format(`
        INSERT INTO reviews
        (review_body, owner, title, designer, category, review_img_url, votes)
        VALUES
        %L
        RETURNING *;`,
    
        [[review_obj.review_body, review_obj.owner, review_obj.title, review_obj.designer, review_obj.category, review_obj.review_img_url, 0]]
        )
    
        return db.query(formatStr)
    
        }).then(({rows}) => {
            rows[0].comment_count = 0
            return rows[0]
    
        })

}

function eraseReview (review_id) {

    if (/\D/.test(review_id)) {
        return Promise.reject("Bad request.")
    }

    return fetchReviews()
    .then((reviews) => {
        return reviews.map((review) => 
            parseInt(review.review_id)
        )
    })
    .then((reviewIDs) => {
        if (!reviewIDs.includes(parseInt(review_id))) {
            return Promise.reject("Bad request.")
        }

        return db.query (`

        DELETE FROM reviews
        WHERE review_id = $1
        
        `,
        [review_id])

    })

}

function touchReviewVotes (review_id, votesObj) {

    if (votesObj.hasOwnProperty("inc_votes") === false) {
        return Promise.reject("Request incomplete.")
    }

    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.")
        }
    })
    .then (() => {

        return db.query (`
        UPDATE reviews 
        SET votes = votes + $1 
        WHERE review_id = $2
        RETURNING *;
        
        
        `,
        [votesObj.inc_votes, review_id])
    })
    .then(({rows}) => {
        return rows[0]
    })

}


module.exports = {eraseReview, addReview, fetchReviews, fetchReviewById, touchReviewVotes, fetchReviewsCommentCount}
