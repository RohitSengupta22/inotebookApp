import React, { useContext, useState, useEffect } from 'react';
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
  const [note,setNote] = useState({title:'',description:'',tags:''})
  const [notesArr,setNotesArr] = useState(Notes);



  //Fetch notes using Fetch API

  async function getData(url = "http://localhost:3006/api/notes") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYzdkNjQ1YmJiNzQ2Y2E2NDg2MTliIn0sImlhdCI6MTY5MjQ0MTkzN30.igD2PVIk-Oy67jHokXADp2jPqe4nlnioBfX7I9gSLyg "
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  return response.json();
 
  
}


  
 

  // This function will be triggered when the select value changes
  const handleChange = (event) => {

    const newNote = {...note,[event.target.name]: event.target.value}
   
    setNote(newNote)
    

  };



  const addHandler = async() => {

    
    // notesArr.push(note);
    // setNotesArr([...notesArr]);

    // setNote({title:'',description:'',tags:''})
    // console.log(note)

    try {
      const response = await getData();
     setNotesArr(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

 



  const deleteNote = (index) =>{

    const newarr = notesArr.filter((elem) =>{
      return elem._id!==index;
    })

    setNotesArr(newarr);
    
  }


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
          name="title"
          value={note.title}
          onChange={handleChange}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Notes...">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px', border: "3px solid blue" }}
            name="description"
            value= {note.description}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Select a tag" className="mt-3">
          <Form.Select aria-label="Floating label select example" style={{ height: '30px', border: "1px solid blue" }} 
         name="tags"
         value={note.tags}
        onChange={handleChange} >
            <option>Open this select menu</option>
            <option value="Personal">Personal</option>
            <option value="Proffesional">Proffesional</option>
            <option value="Others">Others</option>
          </Form.Select>
        </FloatingLabel>
        <Button variant="success" className='addnote' onClick={addHandler}>Add Note</Button>{' '}

        <div className='NoteComponent'>
         
          {notesArr.map((elem, index) => {

            index= elem._id
            const cardStyle = {
              marginTop: "10px",
              border: "2px solid indigo",
              backgroundColor: "yellow" 
            };

            return (
              <Card key={index} style={cardStyle}>
                <Card.Body style={{color: "black", fontWeight : "bolder"}}>{elem.title}</Card.Body>
                <Card.Body style={{color: "blue",maxWidth: "60%"}}>{elem.description}</Card.Body>
                <Card.Body style={{color: "red"}}>{elem.tags}</Card.Body>
                <i class="fa-solid fa-trash" id="dltIcon" onClick={() => deleteNote(index)}></i>
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
