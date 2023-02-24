const {addReview} = require("./../models/review-models")


function postReview (req, res, next) {

    const review_obj = req.body

    addReview(review_obj).then((review) => {
        res.status(201).send({review})

    })
    .catch((error) => {
        next(error)
    })
}

module.exports = postReview