const {fetchReviewsCommentCount, eraseReview, fetchReviewById, touchReviewVotes, addReview} = require ("../models/review-models")


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

function postReview (req, res, next) {

    const review_obj = req.body

    addReview(review_obj).then((review) => {
        res.status(201).send({review})

    })
    .catch((error) => {
        next(error)
    })
}


module.exports = {postReview, patchReviewVotes, deleteReview, getReviewById, getReviews}


