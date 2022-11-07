 
import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
 
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { useParams } from 'react-router-dom';

const categories = [
    "CPU",
    "computer",
    "Mobile",
    "mouse",
    "Camera"
  ];

const Products = () => {
    const dispatch = useDispatch();

  
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] =  useState([2,10000]);
  const {
    products,
    loading,
    productsCount,
    resultPerPage
  } = useSelector((state) => state.products);
  const { keyword } = useParams(); // get from url what ever entered in search see app.js
  const setCurrentPageNo = (e) => {  // this will set our current page initially one, but if products are more then results to show then pagination will set current page value to 2 with its button[2], which automatically hits url in action.js with "?page= 2" which leads db to show with skipped products as mentioned in backend logic
    setCurrentPage(e);
  };

  const rangeSelector = (event, newValue) => {
    setPrice(newValue);
    console.log(newValue)
  };


  useEffect(() => {

    dispatch(getProduct(keyword,currentPage,category,ratings,price));

  }, [dispatch,keyword,currentPage,category,ratings,price]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
          <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />

              <Typography id="range-slider" gutterBottom>
                Select Price:
              </Typography>
              <Slider
                value={price}
                onChange={rangeSelector}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              />
              Price range is between {price[0]}/- and {price[1]} /-
            </fieldset>
             
              
              
             

          </div>

         {productsCount > resultPerPage  && 
         ( <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>)}
      
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products