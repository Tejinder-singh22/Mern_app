
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import { BrowserRouter as Router,Route, Routes } from  "react-router-dom";
import webfont from "webfontloader";
 
import React from "react";
import Loader from './component/layout/Loader/Loader';

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
        {<Route exact path="/sad" element={<Loader/>} />  /* check loader and how its css is done in layout/loader */}
       </Routes>
       <Footer/>
  </Router>

);
}

export default App;
