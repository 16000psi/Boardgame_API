const fetchApi = require ("./../models/fetch-api")

function getApi (req, res, next) {

    fetchApi().then((api) => {
        res.status(200).send({api})
    })
    .catch((error) => {
        next(error)
    })


}

module.exports = getApi