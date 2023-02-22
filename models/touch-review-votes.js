const db = require("./../db/connection")
const fetchReviewById = require ("./fetch-review-byId")

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

module.exports = touchReviewVotes