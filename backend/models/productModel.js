const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product description"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
                {
                public_id:{
                    type:String,
                    required:true
                },
                url:{
                    type:String,
                    required:true
                }
            }
        ],
    category:{
        type:String,
        required:[true,"please enter product category"]

    },
    Stock:{
        type:Number,
        required:[true,"please enter product Stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{          /* this field is to store the id of a user who is making a product (remove confusion) */
            type: mongoose.Schema.ObjectId,
            ref: "User",  /* ref option is what tells Mongoose which model to use during population */
            required:true,
        },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],

    user:{          /* this field is to store the id of a user who is making a product (remove confusion) */
        type: mongoose.Schema.ObjectId,
        ref: "User",  /* ref option is what tells Mongoose which model to use during population */
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);