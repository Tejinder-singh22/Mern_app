import React, { Fragment , useEffect} from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
// import { useAlert } from "react-alert";

const Home = () => {

  const dispatch = useDispatch();

  const {loading,error,products,productsCount} = useSelector((state) => state.products) // to get all data from redux store

 
  useEffect(()=>{

  //  if(error){
  //   return alert.error(error);
  //  }

    dispatch(getProduct());
 }, [dispatch, error]);   // things inside this array are the dependencies like when they change then the code inside useEffect will work

  return (
  <Fragment>
    {loading ? (<Loader/>) : <Fragment>
 
 <MetaData title="home working"/>


<div className="banner">
           <p>Welcome to Ecommerce</p>
           <h1>FIND AMAZING PRODUCTS BELOW</h1>

           <a href="#container">
             <button>
               Scroll <CgMouse />
             </button>
           </a>
         </div>
         <h2 className="homeHeading">Featured Products</h2>
         <div className="container" id="container">
            
               {products && products.map((product) => 
                  
                  <ProductCard product={product} />
               )}
       
         </div>  
 </Fragment>}
    </Fragment>
  
)};

export default Home;