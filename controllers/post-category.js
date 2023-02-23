const addCategory = require ("./../models/add-category")

function postCategory (req, res, next) {

    const category_obj = req.body

    addCategory(category_obj).then((category) => {
        res.status(201).send({category})

    })
    .catch((error) => {
        next(error)
    })


}

module.exports = postCategory
