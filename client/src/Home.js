import React, { useContext, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import NavbarComp from './Navbar';
import Container from 'react-bootstrap/esm/Container';
import './App.css'


const Home = () => {


  return (
    <>
    
      <NavbarComp />
     
     <Container className='NoteContainer'>
    
      <FloatingLabel controlId="floatingTextarea2" label="Notes...">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px',border: "3px solid blue" }}
        />
      </FloatingLabel>
      <Button variant="success" className='addnote'>Add Note</Button>{' '}
      </Container>
    </>
  );
};

export default Home;
