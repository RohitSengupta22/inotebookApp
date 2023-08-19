import React, { useContext, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NoteContext } from './Context/NoteState';
import NavbarComp from './Navbar';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import './App.css'


const Home = () => {

  const Notes = useContext(NoteContext);
  const [title,setTitle] = useState('')
  const [selectedTag, setSelectedTag] = useState(''); // State to store the selected tag

  // This function will be triggered when the select value changes
  const handleTagChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTag(selectedValue);
    // You can perform additional actions based on the selected value
    console.log(selectedValue)
  };


  return (
    <>

      <NavbarComp />

      <Container className='NoteContainer'>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3"
        >
          <Form.Control 
          as="textarea" 
          placeholder="Leave a comment here" 
          style={{ height: '30px', border: "1px solid blue" }} 
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Notes...">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px', border: "3px solid blue" }}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Select a tag" className="mt-3">
          <Form.Select aria-label="Floating label select example" style={{ height: '30px', border: "1px solid blue" }} value={selectedTag}
        onChange={handleTagChange} >
            <option>Open this select menu</option>
            <option value="Personal">Personal</option>
            <option value="Proffesional">Proffesional</option>
            <option value="Others">Others</option>
          </Form.Select>
        </FloatingLabel>
        <Button variant="success" className='addnote'>Add Note</Button>{' '}

        <div className='NoteComponent'>
         
          {Notes.map((elem, index) => {
            const cardStyle = {
              marginTop: "10px",
              border: "2px solid indigo",
              backgroundColor: "yellow" 
            };

            return (
              <Card key={index} style={cardStyle}>
                <Card.Body style={{color: "black", fontWeight : "bolder"}}>{elem.title}</Card.Body>
                <Card.Body style={{color: "blue"}}>{elem.description}</Card.Body>
                <Card.Body style={{color: "red"}}>{elem.tags}</Card.Body>
                <i class="fa-solid fa-trash" id="dltIcon"></i>
                <i class="fa-solid fa-pen-to-square" id="editIcon"></i>
              </Card>
            );
          })}
          <h4></h4>
        </div>
      </Container>

    </>
  );
};

export default Home;
