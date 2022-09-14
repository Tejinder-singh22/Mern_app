// const ErrorHandler = require("../utils/errorHandler")

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next)=>{
    
    err.status = err.statusCode || 500;       // status of err is set here
    
    err.message = err.message || "Internal Server Error";   //Message set in Error Handler class or internal server error

  
    
    //Wrong Mongodb id Error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongoose Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

     //Wrong JWT  error
     if(err.name === "jsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

     //JWT Expire error
     if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.status).json({
        success: false,
        message:err.message,
    })
}