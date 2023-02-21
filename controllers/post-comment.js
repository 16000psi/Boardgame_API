const addComment = require ("./../models/add-comment")

function postComment (req, res, next) {

    addComment().then((result) => {

    })
    .catch((error) => {
        next(error)
    })


}



module.exports = postComment