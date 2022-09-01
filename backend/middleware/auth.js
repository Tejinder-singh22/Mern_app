const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    console.log('inside auth')
    const { token } = req.cookies;  //get the token stored in cookies during login / register
    // this stored token is obviously yours if we priouvsly login or reg ///if yes then our server tries to match with DB if we are present their previously 
    if(!token){
        return next( new ErrorHandler("Please Login to access this resource",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)  //verifyng that token of cokies with id's in db if matches means it is that perticular user
    
   req.user = await User.findById(decodedData.id); //now store all details of that perticular user in user key in request object unless until it is logined not logout

   next();

})

exports.authorizeRoles = (...roles) =>{ //this is a rest operator in funciton argument
     
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){  //after auth middleware current user's data is stored in req parmameter as user

           /* if  user's role not matched with defined role which is comming (...roles)*/
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access the resource`,403))
        }

        next();  
     }


}
