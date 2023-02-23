const touchComment = require ("./../models/touch-comment")

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

module.exports = patchComment