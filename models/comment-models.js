const db = require("./../db/connection")
const {fetchReviewById} = require("./review-models")
const {fetchUsers} = require ("./user-models")
const format = require ("pg-format")



function fetchComments () {

    return db.query(`SELECT * FROM comments;`)
    .then(({rows}) => {
        return rows
    })

}


function touchComment (comment_id, votesObj) {

    if (votesObj.hasOwnProperty("inc_votes") === false) {
        return Promise.reject("Request incomplete.")
    }

    return fetchComments().then((comments) => {
        const comment_ids = comments.map((comment) => 
        parseInt(comment.comment_id))
        if (!comment_ids.includes(parseInt(comment_id))) {
            return Promise.reject("Item not found.")
        }
    })
    .then (() => {

        return db.query (`
        UPDATE comments 
        SET votes = votes + $1 
        WHERE comment_id = $2
        RETURNING *;
        
        
        `,
        [votesObj.inc_votes, comment_id])
    })
    .then(({rows}) => {
        return rows[0]
    })

}

function addComment (review_id, newComment) {



    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.")
        }
    })
    .then(() => {

        return fetchUsers().then((result) => {

            if (newComment.hasOwnProperty("username") === false || newComment.hasOwnProperty("body") === false) {
    
                return Promise.reject("Request incomplete.")
            }
            
            const filtered = result.filter((user) => {
                if (user.username === newComment.username) {
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
        INSERT INTO comments
        (body, review_id, author, votes)
        VALUES
        %L
        RETURNING *;`,
    
        [[newComment.body, review_id, newComment.username, 0]]
        )
    
        return db.query(formatStr)
    
        }).then(({rows}) => {
            return rows[0]
    
        })
}




function fetchCommentsByReview (review_id, limit = null, p = null) {

    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.");
        }
    }).then(() => {

    let queryString = 
    `
    SELECT * FROM comments
    where review_id = $1
    ORDER BY created_at DESC `

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


    return db.query(queryString, [review_id])
    .then(({rows}) => {
        return rows
    })

})

}

function eraseComment (comment_id) {

    if (/\D/.test(comment_id)) {
        return Promise.reject("Bad request.")
    }

    return fetchComments()
    .then((comments) => {
        return comments.map((comment) => 
            parseInt(comment.comment_id)
        )
    })
    .then((commentIds) => {
        if (!commentIds.includes(parseInt(comment_id))) {
            return Promise.reject("Bad request.")
        }

        return db.query (`

        DELETE FROM comments
        WHERE comment_id = $1
        
        `,
        [comment_id])

    })

}



module.exports = {fetchComments, addComment, fetchCommentsByReview, touchComment, eraseComment}