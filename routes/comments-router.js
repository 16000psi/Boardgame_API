const commentsRouter = require("express").Router()
const {getCommentsPerReview, postComment, deleteComment, patchComment} = require("./../controllers/index")

commentsRouter.route("/:comment_id")
.delete(deleteComment)
.patch(patchComment)

module.exports = commentsRouter