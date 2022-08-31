const mongoose = require("mongoose")
const validator = require("validator");
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
               type:String,
               required:[true,"please enter your name"],
               maxLength:[30,"Name cannot exceed 30 characters"],
               minLength:[4,"name should have more then 4 characters"]

    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter your password"],
        minLength:[8,"password should be greater than 8 characters"],
        select:false, //false means whenever anyone runs a find query it gets all things accept password field
    },
    avatar:{
        
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        
    },
    role:{
        type:String,
        default: "user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

    
 } )

 userSchema.pre("save",async function(next){ //pre is event ..here we want to encrypt pass before saving user schema
  
     if(!this.isModified("password")){  //if password field is not changed then skip this other wise bycrypt newly entered password
        next();
     }
     this.password =  await bcrypt.hash(this.password,10)
 })

 //JWT TOKEN
 /*adding method to userSchema by using  methods method */
 userSchema.methods.getJWTToken = function (){
    /* we have written this fun in model because we are adding unique id as _id which is generat during adding data in this */
     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
     })
 }  /*we calling this method in controller after user creation */

 
 //COMPARE PASSWORD
 userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
 }


 module.exports = mongoose.model("User",userSchema)