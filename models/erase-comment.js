const db = require("../db/connection")

const fetchComments = require ("./fetch-comments")


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

module.exports = eraseComment