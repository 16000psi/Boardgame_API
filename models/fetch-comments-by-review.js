const db = require("./../db/connection")
const fetchReviewById = require("./fetch-review-byId")

function fetchCommentsByReview (review_id) {

    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.");
        }
    }).then(() => {
    return db.query(`SELECT * FROM comments
    where review_id = $1
    ORDER BY created_at DESC;`, [review_id])
    .then(({rows}) => {
        return rows
    })

})

}


module.exports = fetchCommentsByReview