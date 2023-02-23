const express = require("express");

const { handle500Error, handleCustomErrors, handle404, handle400, handle404NoEndpoint } = require("./controllers/index");

const apiRouter = require ("./routes/api-router")


const app = express();

app.use(express.json())


app.use("/api", apiRouter)

app.use(handle404NoEndpoint)

app.use(handle400)

app.use(handle404)

app.use(handleCustomErrors)

app.use(handle500Error);

module.exports = app;
