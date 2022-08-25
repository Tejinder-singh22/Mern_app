const { remove } = require("../models/productModel");

class ApiFeatures{
    /* param1 db query, keyword*/
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){    //here we are  search if any character matches or it is capital or small eg: samosa/SAMOSA give samosa related search also
     const keyword = this.queryStr.keyword ? 
     { name: { $regex: this.queryStr.keyword,
       $options: "i", } }
     : {};
     
     console.log(keyword)

     //now we have to  tell query that you can search this know.
      this.query = this.query.find({ ...keyword}); //spread operator to open that object 
      return this;  //returning this class 
    }

    /* filter according to category*/
    filter(){
       const queryCopy =  {...this.queryStr}

       //Removing some fields accept category because we only need cateogroy this time
       const removeFields = ["keyword","page","limit"];

       removeFields.forEach((key)=> delete queryCopy[key]);

       console.log(queryCopy);
    }


}

module.exports = ApiFeatures;