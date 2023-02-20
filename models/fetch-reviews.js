const db = require("./../db/connection")

fetchReviews = () => {

    return db.query(`SELECT * FROM reviews;`)
    .then(({rows}) => {
        return rows
    })

}



module.exports = fetchReviews