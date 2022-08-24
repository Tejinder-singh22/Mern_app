
module.exports = theFunc => (req,res,next)=>{
  Promise.resolve(theFunc(req, res, next)).catch(next);   // every function passed here will be implemented with try and catch , try here is promise resolve 
}