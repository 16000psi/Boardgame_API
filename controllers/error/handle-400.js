function handle400 (error, req, res, next) {
    if (error === "Bad request.") {
        res.status(400).send({msg : "Bad request."})
    }
    next(error)
}

module.exports = handle400