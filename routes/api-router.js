const apiRouter = require("express").Router()



const categoriesRouter = require("./categories-router")
const usersRouter = require("./users-router")
const commentsRouter = require("./comments-router")
const reviewsRouter = require("./reviews-router")


const {getApi} = require("./../controllers/index")

apiRouter.get("/",getApi) // "get /api"

apiRouter.use("/categories", categoriesRouter)
apiRouter.use("/reviews", reviewsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/comments", commentsRouter)


module.exports = apiRouter