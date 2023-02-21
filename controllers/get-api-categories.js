const fetchCategories = require ("./../models/fetch-categories")

function getCategories  (req, res, next) {


    fetchCategories()
    .then((categories) => {
        res.status(200).send({categories})
    })
    .catch((error) => {
        next(error)
    })

}

module.exports = getCategories