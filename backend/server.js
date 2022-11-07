const app  =require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary  = require('cloudinary');

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{   //eg when a variable is not defined
    console.log(`Error: ${err.message}`);
    process.exit(1);
})

// console.log(tejinder);







dotenv.config({path:"backend/config/config.env"});

connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const server = app.listen(process.env.PORT,()=>{
    console.log(`listening on port http://localhost:${process.env.PORT}`);
})

module.exports = server;


process.on("unhandledRejection", (err)=>{  //unhandles means ex: where promise is unhandled / catch is not there after then example
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled exception");
    
    server.close(()=>{
        process.exit(1);
    })
})