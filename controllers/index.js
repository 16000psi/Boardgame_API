exports.getCategories = require ("./get-api-categories");
exports.getReviews = require ("./get-api-reviews.js");
exports.handleCustomErrors = require ("./error/handle-custom-errors");
exports.handle500Error = require ("./error/handle-500-errors.js")
exports.getReviewById = require ("./get-api-review-byId")
exports.handle404NoEndpoint = require ("./error/handle-404-noEndpoint")
exports.handle400 = require ("./error/handle-400")
exports.handle404 = require ("./error/handle-404")
exports.postComment = require("./post-comment")
exports.getCommentsPerReview = require ("./get-api-reviews-reviewid-comments")
exports.getUsers = require ("./get-api-users")
exports.patchReviewVotes = require ("./patch-review-votes")
exports.getApi = require ("./get-api")
exports.deleteComment = require ("./delete-api-comment")
exports.getUserByUsername = require ("./get-user-byUsername")
exports.patchComment = require ("./patch-comment")
exports.postReview = require ("./post-review")
exports.postCategory = require ("./post-category")
exports.deleteReview = require ("./delete-review")
