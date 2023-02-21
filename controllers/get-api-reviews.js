const fetchReviewsCommentCount = require ("../models/fetch-reviews-commentCount")

function getReviews  (req, res, next) {

    const {sort_by, order, category} = req.query

    fetchReviewsCommentCount(sort_by, order, category)
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews
