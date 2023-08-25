import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavbarComp from "./Navbar";
import About from "./About";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextContext } from "./Navbar";
import Login from "./Login";


function App() {
  return (

    <BrowserRouter>
      <>
        <Routes>
          
        <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
         
        </Routes>

      </>
    </BrowserRouter>
  
  );
}

export default App;
