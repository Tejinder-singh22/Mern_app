const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register are Userr
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        },
    });
    
    sendToken(user,201,res);
})


// Login user
exports.LoginUser = catchAsyncErrors( async  (req, res, next)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("please Enter Email and password",401))
    } 

    const user = await User.findOne({email}).select("+password");  //select password speacialy because at the time of model we pass password select false (cant be acces by normal find )
   
    if(!user){
        return next(new ErrorHandler("Invalid email or password"))
    }
    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
 
    // const token = user.getJWTToken();
    // res.status(200).json({
    //     success: true,
    //     token,
    // })

    sendToken(user,200,res);
})

//Logout User 
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    })
})