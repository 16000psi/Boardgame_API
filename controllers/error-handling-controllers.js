exports.handleCustomErrors = (error, request, response, next) => {

  next(error);
 
};


exports.handle500Error = (error, request, response, next) => {
    console.log(error, "<<< error");
    response.status(500).send({ msg: "Sorry, server error" });
};