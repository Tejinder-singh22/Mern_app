import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";

//2nd
export const productReducer = (state = {product:[]}, action)=>{ //A reducer is a function that determines changes to an application's state. It uses the action it receives to determine this change

  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    return {
        loading: true,
        products:[]
    }

    case ALL_PRODUCT_SUCCESS:
        return {
            loading:false,
            products:action.payload.products,
            productsCount:action.payload.productsCount
        }
        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                product:action.payload,
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null,
                }
    default:
        return state;
  }
};