function handle404NoEndpoint (req, res, next) {
    res.status(404).send({msg : "Path not found."})
}

module.exports = handle404NoEndpoint