const fetchReviewsCommentCount = require ("../models/fetch-reviews-commentCount")

function getReviews  (req, res, next) {

    fetchReviewsCommentCount()
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    
    .catch((error) => {
        next(error)
    })

}

module.exports = getReviews





// Superflous mistake JS version:

// function getReviews  (req, res, next) {

    // Promise.all([fetchReviews(),fetchComments()])
    // .then((results) => {
    //     return reviewsCountedComments = countComments(results[0], results[1])
        
    // })
    // .then((reviews) => {
    //     res.status(200).send({reviews})

    // })
    
//     .catch((error) => {
//         next(error)
//     })

// }
