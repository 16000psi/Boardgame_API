const {fetchUsers,fetchUserByUsername, addUser} = require ("./../models/user-models")

function getUsers (req, res, next) {

    fetchUsers().then((users) => {

        res.status(200).send({users})
    })
    .catch((error) => {
        next(error)
    })


}

function getUserByUsername (req, res, next) {
    const {username} = req.params

    fetchUserByUsername(username).then((user) => {

        res.status(200).send({user})
    })
    .catch((error) => {
        next(error)
    })


}

function postUser (req, res, next) {
    const newUser = req.body
    addUser(newUser).then((user) => {
        res.status(201).send({user})

    })
    .catch((error) => {
        next(error)
    })


}

module.exports = {getUserByUsername, getUsers, postUser}
