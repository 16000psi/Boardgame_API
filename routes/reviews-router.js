const reviewsRouter = require("express").Router()

const {getReviews, deleteReview, getReviewById, getCommentsPerReview, postReview, postComment, patchReviewVotes } = require("./../controllers/index");

reviewsRouter.route("/")
.get(getReviews)
.post(postReview)

reviewsRouter.route("/:review_id")
.get(getReviewById)
.patch(patchReviewVotes)
.delete(deleteReview)


reviewsRouter.route("/:review_id/comments")
.get(getCommentsPerReview)
.post(postComment)



module.exports = reviewsRouter
