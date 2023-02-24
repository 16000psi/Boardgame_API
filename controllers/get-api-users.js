const {fetchUsers} = require ("./../models/user-models")

function getUsers (req, res, next) {

    fetchUsers().then((users) => {

        res.status(200).send({users})
    })
    .catch((error) => {
        next(error)
    })


}

module.exports = getUsers