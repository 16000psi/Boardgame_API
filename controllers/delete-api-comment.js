const eraseComment = require ("./../models/erase-comment")

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


module.exports = deleteComment