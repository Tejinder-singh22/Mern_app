
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
// create product -- admin
exports.createProduct  = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

// Get All products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) =>{
    
  const products =   await Product.find();
    res.status(200).json({ success:true,
        products});
}
)
//Update Product -- admin

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
     let product = await Product.findById(req.params.id);

     if(!product){
        return next(new ErrorHandler("product not found",404)) //what ever we pass in next operator means what will run next or next tick.
     }
 
     product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
    useFindAndModify:false
});

 res.status(200).json({
    success:true,
    product
 })

})

//Delete product 

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404)) //what ever we pass in next operator means what will run next or next tick.
     }

    await product.remove();

    res.status(200).json(({
        success:true,
        message: "Product Delete Success" 
    }))
})

//Get product Details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("product not found",404)) //what ever we pass in next operator means what will run next or next tick.
    }

    res.status(200).json(({
        success:true,
        product
    }))


})