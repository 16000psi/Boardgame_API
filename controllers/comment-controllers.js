const {touchComment, eraseComment, addComment, fetchCommentsByReview} = require ("./../models/comment-models")


function patchComment (req, res, next) {

    const {comment_id} = req.params
    const votesObj = req.body

    if(/\D/.test(comment_id) === true) {
        next("Bad request.")
    }

    touchComment(comment_id,votesObj)
    .then((comment) => {
        res.status(202).send({comment})

    })
    .catch((error) => {
        next(error)
    })


}

function deleteComment (req, res, next) {

    const {comment_id} = req.params 

    eraseComment(comment_id)
    .then(() => {
        res.status(204).send()
    })
    
    .catch((error) => {
        next(error)
    })


}

function postComment (req, res, next) {
    const {review_id} = req.params
    const newComment = req.body

    if(/\D/.test(review_id) === true) {
        next("Bad request.")
    }

    addComment(review_id, newComment).then((comment) => {
        res.status(201).send({comment})

    })
    .catch((error) => {
        next(error)
    })


}

function getCommentsPerReview (req, res, next) {

    const {review_id} = req.params 
    const {limit, p} = req.query

    fetchCommentsByReview(review_id, limit ,p).then((comments) => {
        res.status(200).send({comments})

    })
    .catch((error) => {
        next(error)
    })

}


module.exports = {getCommentsPerReview, postComment, deleteComment, patchComment}
