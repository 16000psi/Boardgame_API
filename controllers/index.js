exports.handleCustomErrors = require ("./error/handle-custom-errors");
exports.handle500Error = require ("./error/handle-500-errors.js")
exports.handle404NoEndpoint = require ("./error/handle-404-noEndpoint")
exports.handle400 = require ("./error/handle-400")
exports.handle404 = require ("./error/handle-404")

exports.getApi = require ("./get-api")

const {getReviews, getReviewById, patchReviewVotes, postReview, deleteReview} = require ("./review-controllers")

const {getUserByUsername, getUsers} = require ("./user-controllers")

const {getCategories, postCategory} = require ("./category-controllers")

const {postComment, getCommentsPerReview, deleteComment, patchComment} = require ("./comment-controllers")

module.exports = {...module.exports, getUserByUsername, getUsers, getCategories, postCategory, postComment, getCommentsPerReview, deleteComment, patchComment, getReviews, getReviewById, patchReviewVotes, postReview, deleteReview}