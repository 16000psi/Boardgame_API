const categoriesRouter = require("express").Router()
const {getCategories, postCategory} = require("./../controllers/index")


categoriesRouter.route("/")
.get(getCategories) 
.post(postCategory)

module.exports = categoriesRouter