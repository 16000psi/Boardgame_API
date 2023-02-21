const express = require("express");
const { handle500Error, handleCustomErrors, getCategories, getReviews } = require("./controllers/index");

const app = express();

app.get("/api/categories", getCategories)

app.get("/api/reviews", getReviews)

app.use(handleCustomErrors)

app.use(handle500Error);

module.exports = app;
