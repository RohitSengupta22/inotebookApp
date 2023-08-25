// Navbar.js
import React, { useState, createContext, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './App.css'





function NavbarComp() {

  const navigate = useNavigate();

  function logoutHandler(){

    localStorage.removeItem('Token')
    navigate('/')

  }
 
 

  return (
    
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" id="Navbar" >
     
            <div className='navcontent'>
            <Navbar.Brand href="#home">i<span style={{color: "rgba(255, 46, 30, 0.8)",fontWeight: "bold"}}>Notebook</span></Navbar.Brand>
            </div>
       
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                <Nav.Link>Contact</Nav.Link>
               

              </Nav>
              <Button variant="outline-dark" className='logoutbtn' onClick={logoutHandler}>Logout</Button>
            </Navbar.Collapse>
          
            
      </Navbar>
   
  );
}

export default NavbarComp;
