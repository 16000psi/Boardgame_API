const {addCategory, fetchCategories} = require ("./../models/category-models")


function getCategories  (req, res, next) {

    fetchCategories()
    .then((categories) => {
        res.status(200).send({categories})
    })
    .catch((error) => {
        next(error)
    })

}

function postCategory (req, res, next) {

    const category_obj = req.body

    addCategory(category_obj).then((category) => {
        res.status(201).send({category})

    })
    .catch((error) => {
        next(error)
    })


}


module.exports = {postCategory, getCategories}
