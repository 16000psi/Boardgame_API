const categoriesRouter = require("express").Router()
const {getCategories} = require("./../controllers/index")

categoriesRouter.get("/",getCategories) 

module.exports = categoriesRouter