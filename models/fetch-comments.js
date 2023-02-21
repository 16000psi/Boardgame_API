const db = require("./../db/connection")

fetchComments = () => {

    return db.query(`SELECT * FROM comments;`)
    .then(({rows}) => {
        return rows
    })

}



module.exports = fetchComments