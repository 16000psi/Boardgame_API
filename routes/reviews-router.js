const reviewsRouter = require("express").Router()

const {getReviews, getReviewById, getCommentsPerReview, postComment, patchReviewVotes } = require("./../controllers/index");

reviewsRouter.get("/", getReviews)

reviewsRouter.route("/:review_id")
.get(getReviewById)
.patch(patchReviewVotes)


reviewsRouter.route("/:review_id/comments")
.get(getCommentsPerReview)
.post(postComment)



module.exports = reviewsRouter
