const db = require("../db/connection")


function fetchReviewById (review_id) {

    return db.query(`
    SELECT * FROM reviews
    WHERE review_id = $1`,
    [review_id])
    .then((result) => {
        if (result.rows.length < 1) {
            return Promise.reject("Bad request.")
        }
        else {
            return result.rows[0]
        }
    })

}


module.exports = fetchReviewById