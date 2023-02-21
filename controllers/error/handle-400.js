function handle400 (error, req, res, next) {
    if (error === "Bad request.") {
        res.status(400).send({msg : "Bad request."})
    }
    if (error === "Username does not exist.") {
        res.status(400).send({msg : "Username does not exist."})

    }
    next(error)
}

module.exports = handle400