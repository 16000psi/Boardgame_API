const db = require("../db/connection")

function fetchUsers () {

    return db.query(`SELECT * FROM users;`)
    .then(({rows}) => {
        return rows
    })
}

function fetchUserByUsername (username) {

    return fetchUsers().then((users) => {
        return users.map((user) => {
            return user.username
        })
    }).then((usernames) => {
        
        if (!usernames.includes(username)) {
            return Promise.reject("Item not found.")
        }
        
        return db.query(`SELECT * FROM users
        WHERE USERNAME = $1;`,
        [username])
        .then(({rows}) => {
            return rows[0]
        })
    })
}

module.exports = {fetchUserByUsername, fetchUsers}


