const express = require("express");
const { handle500Error, handleCustomErrors, getCategories, getReviews, getReviewById, handle404, handle400 } = require("./controllers/index");

const app = express();

app.get("/api/categories", getCategories)

app.get("/api/reviews", getReviews)

app.get("/api/reviews/:review_id", getReviewById)

app.use(handle404)

app.use(handle400)

app.use(handleCustomErrors)

app.use(handle500Error);

module.exports = app;
