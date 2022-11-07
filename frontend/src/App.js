
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import { BrowserRouter as Router,Route, Routes } from  "react-router-dom";
import webfont from "webfontloader";
 import Search from "./component/Product/Search.js"
 import LoginSignUp from "./component/User/LoginSignUp.js"
import React from "react";
import { useSelector } from "react-redux";
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

    store.dispatch(loadUser());// this means on any page load state can't be empty, that means now even we reload page state can't be empty, we have users in state and all useEffect functions that have isAuthenticated as dependecy will run, so we can't make state empty on page refresh because atleast every time we have user info in state ..until and unless we logout
  },[])

  return (
    
      <Router>
       <Header/>
       {isAuthenticated && <UserOptions user={user} />}
       <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />

        <Route exact path="/search" element={<Search/>} />
        <Route exact path="/login" element={<LoginSignUp/>} />
        <Route exact path="/account" element={<Profile/>} />
        {/* <Route exact path="/contact" element={Contact} />

        <Route exact path="/about" element={About} />

        <ProtectedRoute exact path="/account" element={Profile} />

        <ProtectedRoute exact path="/me/update" element={UpdateProfile} /> */}
       </Routes>
       <Footer/>
  </Router>

);
}

export default App;
