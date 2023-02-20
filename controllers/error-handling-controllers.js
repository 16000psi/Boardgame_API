exports.handleCustomErrors = (error, request, response, next) => {
    // if (error === "invalid sort by option given"){
    //   response.status(400).send({msg: "Bad request."})
    // }
  
    // else if (error === "invalid order option given") {
    //   response.status(400).send({msg: "Bad request."})
    // }
  
    // else {
      next(error)
    // }
  }


exports.handle500Error = (error, request, response, next) => {
    console.log(error);
    response.status(500).send({ msg: "Sorry, server error" });
};