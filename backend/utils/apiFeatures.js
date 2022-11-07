
class ApiFeatures{
    /* param1 db query, keyword*/
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){    //here we are  search if any character matches or it is capital or small eg: samosa/SAMOSA give samosa related search also
     const keyword = this.queryStr.keyword ?  //here queryStr.keyword is passed as reference key in url in headers
     { name: { $regex: this.queryStr.keyword,
       $options: "i", } }
     : {};
     

     //now we have to  tell query that you can search this know.
      this.query = this.query.find({ ...keyword}); //spread operator to open that object not passed by reference
      return this;  //returning this class 
    }

    /* filter according to category*/
    filter(){
       const queryCopy =  {...this.queryStr} //whilw copiyng object use ... to not use object by reference, it can't effect original one 

       //Removing some fields accept category because we only need cateogroy this time
       const removeFields = ["keyword","page","limit"];

       removeFields.forEach((key)=> delete queryCopy[key]); // read like this -> delete from object [this]
      
      //Filter for Price and Rating this time
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);   //add $ before gt,gte,and lt
       this.query = this.query.find(JSON.parse(queryStr));  //this.query means Product.find method
     
console.log(this.query+' inner');
       return this;
    }

    pagination(resultPerPage)
    {
      const  currentPage = Number(this.queryStr.page) || 1;  //suppose we have 50 product and we want to show 5 on each page 
      const skip = resultPerPage * (currentPage-1)  //eg 1st time we dont have to skip 1-1 = 0 and next time skip 5 show next 5 .......
      // console.log(skip);
      this.query = this.query.limit(resultPerPage).skip(skip);
     
      return this;
    }


}

module.exports = ApiFeatures;