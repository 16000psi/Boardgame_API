const eraseReview = require ("./../models/erase-review")

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