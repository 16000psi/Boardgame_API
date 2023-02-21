const addComment = require ("./../models/add-comment")

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



module.exports = postComment