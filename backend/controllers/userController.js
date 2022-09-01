const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");

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

//Forget Passord
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

     const user = await User.findOne({
        email:req.body.email
     })

     if(!user){
        return next(new ErrorHandler("User not found",404));

     }

     //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
 
    await user.save({validateBeforeSave: false});  //saving because in getResetPasswordToken function we added hex token in user's schema in field name as resetPasswordToken 

      /* The Url which will be sent in mail to reset*/
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
 
    /*  message to sent in email*/
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it `

     try{

         await sendEmail({
         email: user.email,
         subject: `Ecommerce Password Recovery`,
         message,
         })

         res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
         })
     } catch (error)
     {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave:false});

        return next(new ErrorHandler(error.message, 500));

     }
     
})

//Reset Password BY url we got through Email
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{
     
     //creating token hash
     const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
     
     const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
     })
  
     if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
     }

     if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password",400))
     }

     user.password = req.body.password;
     user.resetPasswordToken =undefined;
     user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user,200,res);
})
