const usersRouter = require("express").Router()
const {getUsers, getUserByUsername, postUser} = require("./../controllers/index")

usersRouter.get("/",getUsers) 

usersRouter.post("/",postUser) 

usersRouter.get("/:username", getUserByUsername)

module.exports = usersRouter