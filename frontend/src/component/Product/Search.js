import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate  } from "react-router-dom";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault(); //prevent page load on submit
    if (keyword.trim()) {
        navigate(`/products/${keyword}`);  //  this url automatically show page containing that perticular item.. as according to routes defined by us
    } else {
        navigate("/products"); // other wise it will show all products page by default
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
     <form className="searchBox" onSubmit={searchSubmitHandler}>    {/*2nd step */}
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}  // 1rst step. here state concept come -> keyword is declared but set only when user enter input in search box
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
