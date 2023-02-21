const express = require("express");

const { handle500Error, handleCustomErrors, getCategories, getReviews, getReviewById, handle404, handle400, handle404NoEndpoint, getCommentsPerReview, postComment } = require("./controllers/index");


const app = express();

app.use(express.json())

app.get("/api/categories", getCategories)

app.get("/api/reviews", getReviews)

app.get("/api/reviews/:review_id", getReviewById)

app.get("/api/reviews/:review_id/comments", getCommentsPerReview)

app.post("/api/reviews/:review_id/comments", postComment)

app.use(handle404NoEndpoint)

app.use(handle400)

app.use(handle404)

app.use(handleCustomErrors)

app.use(handle500Error);

module.exports = app;
