const commentsRouter = require("express").Router()
const {getCommentsPerReview, postComment, deleteComment, patchComment, getAllCommentsWithReviewID} = require("./../controllers/index")

commentsRouter.route("/")
.get(getAllCommentsWithReviewID)

commentsRouter.route("/:comment_id")
.delete(deleteComment)
.patch(patchComment)

module.exports = commentsRouter