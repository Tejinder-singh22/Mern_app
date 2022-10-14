import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";

//1st
// dispatch (a fun of redux) an actions
export const  getProduct = () => async (dispatch) =>{  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change.
 
    try{
     dispatch({type:ALL_PRODUCT_REQUEST});

     const {data} = await axios.get("/api/v1/products")

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