const fetchReviewsCommentCount = require ("../models/fetch-reviews-commentCount")

function getReviews  (req, res, next) {

    fetchReviewsCommentCount()
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews
