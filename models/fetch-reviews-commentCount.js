const db = require("./../db/connection")

fetchReviewsCommentCount = () => {

    return db.query(`
        SELECT reviews.*, COUNT(comments.review_id) AS comment_count
        FROM reviews
        LEFT JOIN comments ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY created_at DESC;
    `)
    .then(({rows}) => {

        for (let i in rows) {
            rows[i].comment_count = parseInt(rows[i].comment_count)
        }
        return rows

    })

}



module.exports = fetchReviewsCommentCount