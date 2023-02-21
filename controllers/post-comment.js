const addComment = require ("./../models/add-comment")

function postComment (req, res, next) {
    const {review_id} = req.params
    const newComment = req.body

    addComment(review_id, newComment).then((comment) => {
        res.status(201).send({comment})

    })
    .catch((error) => {
        next(error)
    })


}



module.exports = postComment