const express = require("express");
const { handle500Error, handleCustomErrors } = require("./controllers/error-handling-controllers");

const app = express();

app.use(express.json());
