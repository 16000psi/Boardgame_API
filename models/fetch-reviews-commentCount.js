const db = require("./../db/connection")

fetchReviewsCommentCount = (sort_by = "created_at", order = "DESC", category) => {

    let queryString = `
    SELECT reviews.*, COUNT(comments.review_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id `

    if (category) {
        category.replace(/_/g, " ")
        queryString += `WHERE category = \'${category}\' `    
    }

    queryString += `GROUP BY reviews.review_id `

    queryString += `ORDER BY ${sort_by} ${order};`



    return db.query(queryString)
    .then(({rows}) => {

        for (let i in rows) {
            rows[i].comment_count = parseInt(rows[i].comment_count)
        }
        return rows

    })

}

// GROUP BY reviews.review_id
//     ORDER BY created_at DESC;



module.exports = fetchReviewsCommentCount