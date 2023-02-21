const fetchReviewById = require ("./fetch-review-byId")
const fetchUsers = require ("./fetch-users")
const db = require("./../db/connection")
const format = require ("pg-format")


function addComment (review_id, newComment) {

    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.")
        }
    })
    .then(() => {

        return fetchUsers().then((result) => {
            
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


module.exports = addComment