
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import { BrowserRouter as Router,Route, Routes } from  "react-router-dom";
import webfont from "webfontloader";
 import Search from "./component/Product/Search.js"
import React from "react";

function App() {

  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[]);

  return (
    
      <Router>
       <Header/>
       <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />

        <Route exact path="/search" element={<Search/>} />

        {/* <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} /> */}
       </Routes>
       <Footer/>
  </Router>

);
}

export default App;
