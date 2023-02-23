const fs = require ("fs/promises")

function getApi (req, res, next) {

    return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then ((result) => {
        return result
    }).then((api) => {
        res.status(200).send({api})
    })
    .catch((error) => {
        next(error)
    })


}

module.exports = getApi