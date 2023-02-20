const categories = require("../db/data/test-data/categories")
const fetchReviews = require ("../models/fetch-reviews")

function getReviews  (req, res, next) {

    fetchReviews()
    .then((reviews) => {
        console.log(reviews)
        res.status(200).send({reviews})
    })
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews