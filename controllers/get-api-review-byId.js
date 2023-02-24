const {fetchReviewById} = require ("../models/review-models")

function getReviewById  (req, res, next) {

    const {review_id} = req.params 

    fetchReviewById(review_id)
    .then((result) => {
        const review = result
        res.status(200).send({review})
    })
    
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviewById
