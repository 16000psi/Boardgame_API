const {touchReviewVotes} = require("./../models/review-models")

function patchReviewVotes(req, res, next) {
    const {review_id} = req.params
    const votesObj = req.body

    if(/\D/.test(review_id) === true) {
        next("Bad request.")
    }

    touchReviewVotes(review_id,votesObj)
    .then((review) => {
        res.status(202).send({review})

    })
    .catch((error) => {
        next(error)
    })

}

module.exports = patchReviewVotes