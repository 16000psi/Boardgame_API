const db = require("./../db/connection")
const fetchCategories = require ("./fetch-categories")

fetchReviewsCommentCount = (sort_by = "created_at", order = "DESC", category = null, limit = null, p = null) => {

    console.log(limit)
    console.log(p)
    

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


module.exports = fetchReviewsCommentCount