const categories = require("../db/data/test-data/categories")
const fetchReviews = require ("../models/fetch-reviews")
const fetchComments = require ("../models/fetch-comments")
const {countComments} = require ("./../utilities")

function getReviews  (req, res, next) {

    Promise.all([fetchReviews(),fetchComments()])
    .then((results) => {
        return reviewsCountedComments = countComments(results[0], results[1])
        
    })
    .then((reviews) => {
        res.status(200).send({reviews})

    })
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews