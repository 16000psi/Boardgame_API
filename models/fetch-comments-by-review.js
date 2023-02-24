const db = require("./../db/connection")
const fetchReviewById = require("./fetch-review-byId")

function fetchCommentsByReview (review_id, limit = null, p = null) {

    return fetchReviewById(review_id).then((result) => {
        if (result.length === 0) {
            return Promise.reject("Item not found.");
        }
    }).then(() => {

    let queryString = 
    `
    SELECT * FROM comments
    where review_id = $1
    ORDER BY created_at DESC `

    if (limit) {

        if (/\D/.test(parseInt(limit)) || (/\D/.test(parseInt(p)) && p !== null)) {
            return Promise.reject("Bad request.")
        }

        queryString += `LIMIT ${limit}`

        if (p) {

            queryString += ` OFFSET ${(p - 1) * limit}`

        }
    }

    queryString += `;`


    return db.query(queryString, [review_id])
    .then(({rows}) => {
        return rows
    })

})

}


module.exports = fetchCommentsByReview