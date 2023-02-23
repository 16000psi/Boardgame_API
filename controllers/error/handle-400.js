function handle400 (error, req, res, next) {
    if (error === "Bad request.") {
        res.status(400).send({msg : "Bad request."})
    }
    if (error === "Username does not exist.") {
        res.status(400).send({msg : "Username does not exist."})

    }

    if (error === "Item already exists.") {
        res.status(400).send({msg : "Item already exists."})
    }

    if (error === "Request incomplete.") {
        res.status(400).send({msg : "Request incomplete."})

    }
    next(error)
}

module.exports = handle400