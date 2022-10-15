import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import RatingStars from "react-rating-stars-component"
import Carousel from "react-material-ui-carousel"
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
const ProductDetails = () => {
    const { id } = useParams();
 const dispatch = useDispatch();

 const { product, loading} = useSelector((state)=> state.productDetails) //2nd Pull that stored data of redux store
//  console.log(product.images[0].url);
 useEffect(()=>{
    dispatch(getProductDetails(id)) // 1ST fetch product details and store it in redux store

 }, [dispatch, id])

 const options = {
    edit: false,
    colour: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? <Loader/> :
      (<Fragment>
        <div  className='ProductDetails'> 
            <div>
              <Carousel>
                {
                    product.images &&
                    product.images.map((item, i)=>(
                        <img className="CarouselImage"
                        key={item.url}
                        src = {item.url}
                        alt= {`${i} Slide`}
                        />
                    )) }
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
               <RatingStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button  >-</button>
                    <input readOnly type="number"  />
                    <button  >+</button>
                  </div>
                  <button
                    
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
            </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>)}
    </Fragment>

  )
            }

export default ProductDetails