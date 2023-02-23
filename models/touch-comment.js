const db = require("./../db/connection")
const fetchComments = require ("./fetch-comments")

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

module.exports = touchComment