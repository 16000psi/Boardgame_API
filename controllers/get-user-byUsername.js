const {fetchUserByUsername} = require ("./../models/user-models")

function getUserByUsername (req, res, next) {
    const {username} = req.params

    fetchUserByUsername(username).then((user) => {

        res.status(200).send({user})
    })
    .catch((error) => {
        next(error)
    })


}

module.exports = getUserByUsername