const fetchReviewsCommentCount = require ("../models/fetch-reviews-commentCount")

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
