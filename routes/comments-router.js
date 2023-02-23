const commentsRouter = require("express").Router()
const {getCommentsPerReview, postComment, deleteComment} = require("./../controllers/index")

commentsRouter.delete("/:comment_id", deleteComment) 

module.exports = commentsRouter