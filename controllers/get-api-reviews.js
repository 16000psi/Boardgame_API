const {fetchReviewsCommentCount} = require ("../models/review-models")

function getReviews  (req, res, next) {

    const {sort_by, order, category, limit, p} = req.query

    fetchReviewsCommentCount(sort_by, order, category, limit, p)
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews
