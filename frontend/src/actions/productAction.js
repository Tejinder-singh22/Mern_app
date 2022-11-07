import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";

//1st
// dispatch (a fun of redux) an actions
export const  getProduct = (keyword = "",currentPage = 1,category,ratings=0,price) => async (dispatch) =>{  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change.
 //keyword and current page are are params here to pass in url to get dired data
 //default value of current page is 1 and keword have " "
    try{
     dispatch({type:ALL_PRODUCT_REQUEST});

     let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&rating=${ratings}&ratings[gte]=${ratings}`;

     if (category) {
       link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
     }

     const {data} = await axios.get(link) // if keyword is empty then obn=viously we have all products

     dispatch({ type: ALL_PRODUCT_SUCCESS,
    payload: data,
     })

    } catch (error) {
        dispatch({   //dispatch means what to show on forntend
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/product/${id}`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const  clearErrors = () => async (dispatch) =>{  // ERRORS Would be null if we use this functio
  
  dispatch({type: CLEAR_ERRORS})  
}