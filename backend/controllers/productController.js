
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
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
    
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const ApiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

//   const products =   await Product.find();
    const products =   await ApiFeature.query; //we can write above line know like this also //same
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
        product,
        productCount,
    }))


})