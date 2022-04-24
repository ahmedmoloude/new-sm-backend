const responseHandler =  (msg, data , statusCode , code) => {
    return (req,res,next) => {
      return res.status(statusCode).json({
        msg: msg,
        code : "R-400",
        data : data,
        code : code
      });
    };
};


module.exports = responseHandler;