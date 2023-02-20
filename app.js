const express = require("express");
const { handle500Error, handleCustomErrors, getCategories } = require("./controllers/index");

// console.log(getCategories)

const app = express();

app.use(express.json());


app.get("/api/categories", getCategories)


module.exports = app;
