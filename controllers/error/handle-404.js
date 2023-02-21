function handle404 (error, req, res, next) {
    if (error === "Item not found.") {
        res.status(404).send({msg : "Item not found."})
    }
    next(error)
}

module.exports = handle404