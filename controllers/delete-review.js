const {eraseReview} = require ("./../models/review-models")

function deleteReview  (req, res, next) {

    const {review_id} = req.params

    eraseReview(review_id)
    .then(() => {
        res.status(204).send()
    })
    .catch((error) => {
        next(error)
    })

}

module.exports = deleteReview