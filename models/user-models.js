const db = require("../db/connection")
const format = require ("pg-format")

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

function addUser (newUser) {

    return fetchUsers().then((result) => {
        return result
    })
    .then((result) => {

        if (newUser.hasOwnProperty("username") === false || newUser.hasOwnProperty("name") === false || newUser.hasOwnProperty("avatar_url") === false) {

            return Promise.reject("Request incomplete.")
        }
        
        const filtered = result.filter((user) => {
            if (user.username === newUser.username) {
                return user
            }
        })

        if (filtered.length > 0 ) {
            return Promise.reject("Username already exists.")
        }
    })
    .then(() => {

        const formatStr = format(`
        INSERT INTO users
        (username, name, avatar_url)
        VALUES
        %L
        RETURNING *;`,
    
        [[newUser.username, newUser.name, newUser.avatar_url]]
        )
    
        return db.query(formatStr)
    
        }).then(({rows}) => {
            return rows[0]
    
        })
}

module.exports = {fetchUserByUsername, fetchUsers, addUser}


