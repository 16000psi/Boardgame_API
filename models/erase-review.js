const db = require("../db/connection")

const fetchReviews = require ("./fetch-reviews")


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

module.exports = eraseReview