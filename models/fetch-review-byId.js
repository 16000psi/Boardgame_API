const db = require("../db/connection")


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


module.exports = fetchReviewById