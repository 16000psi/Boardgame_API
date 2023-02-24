const {fetchUsers,fetchUserByUsername} = require ("./../models/user-models")

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

module.exports = {getUserByUsername, getUsers}
