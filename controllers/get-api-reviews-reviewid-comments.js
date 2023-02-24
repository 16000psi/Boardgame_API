const {fetchCommentsByReview} = require("./../models/comment-models")

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



module.exports = getCommentsPerReview