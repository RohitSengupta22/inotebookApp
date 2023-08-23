import React, { useContext, useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NoteContext } from './Context/NoteState';
import NavbarComp from './Navbar';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Home = () => {

  const Notes = useContext(NoteContext);
  const [note, setNote] = useState({ title: '', description: '', tags: '' })
  const [notesArr, setNotesArr] = useState(Notes);
  const [id, setId] = useState(null)
  const [toaststate,setToaststate] = useState(true)

  //states for storing modal comp states
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {

    setOpen(true);
    setId(id)
    console.log(id)

  }
  const handleClose = () => setOpen(false);





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

    const res = await response.json();
    setNotesArr(res)


  }

  useEffect(() => {

    getData()

  }, [])


  // Add a note

  // Add a note
  async function addNote(data) {
    try {
      const response = await fetch("http://localhost:3006/api/notes/createNote", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYzdkNjQ1YmJiNzQ2Y2E2NDg2MTliIn0sImlhdCI6MTY5MjQ0MTkzN30.igD2PVIk-Oy67jHokXADp2jPqe4nlnioBfX7I9gSLyg " // Replace with your actual auth token
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });

      // console.log(response); 
      const res = await response.json();
      console.log(res)

      setNotesArr([...notesArr, res]); // Add the new note to the existing array
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // In your component, use the addNote function when the "Add Note" button is clicked
  const addHandler = async () => {
    try {

      if(note.title!=='' && note.description!=='' && note.tags!==''){
        await addNote(note); // Call the addNote function with the note data
        setToaststate(true)
        toast('New Note added below');
        setNote({ title: "", description: "", tags: "" }); // Clear the input fields
      } else{

        setToaststate(false)
        toast("Please enter valid title, description and select valid tags")
      }
     
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };








  // This function will be triggered when the select value changes
  const handleChange = (event) => {

    const newNote = { ...note, [event.target.name]: event.target.value }

    setNote(newNote)


  };


  async function dltNote(id) {

    try {

      const response = await fetch(`http://localhost:3006/api/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYzdkNjQ1YmJiNzQ2Y2E2NDg2MTliIn0sImlhdCI6MTY5MjQ0MTkzN30.igD2PVIk-Oy67jHokXADp2jPqe4nlnioBfX7I9gSLyg '
        }
      })

      const res = await response.text()
      console.log(res)

      setNotesArr(notesArr.filter((elem) => {
        return elem._id !== id
      }))

      console.log(notesArr)

    } catch (error) {

      console.error('Error deleting note:', error);

    }

  }








  const deleteNote = (index) => {

    dltNote(index)
    handleClose()

  }


  return (
    <>

      <NavbarComp />

      {toaststate? <Toaster toastOptions={{
        className: '',
        style: {
          border: '1px solid green',
          padding: '16px',
          color: 'white',
          backgroundColor: "green"
        },
      }} /> : <Toaster toastOptions={{
        className: '',
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'white',
          backgroundColor: "red"
        },
      }} /> }

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
            onChange={handleChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Notes...">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px', border: "3px solid blue" }}
            name="description"
            value={note.description}
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
        <Button variant="success" className='addnote' style={{backgroundColor: "rgba(149, 101, 230, 0.8)",borderColor: "rgba(149, 101, 230, 0.8)"}} onClick={addHandler}>Add Note</Button>{' '}

        <div className='NoteComponent'>

          {notesArr.map((elem, index) => {

            index = elem._id
            const cardStyle = {
              marginTop: "10px",
              border: "2px solid indigo",
              backgroundColor: "rgba(149, 101, 230, 0.8)"
            };

            return (
              <Card key={index} style={cardStyle}>
                <Card.Body style={{ color: "black", fontWeight: "bolder" }}>{elem.title}</Card.Body>
                <Card.Body style={{ color: "blue", maxWidth: "60%",fontWeight: "bold" }}>{elem.description}</Card.Body>
                <Card.Body style={{ color: "red" }}>{elem.tags}</Card.Body>
                <i className="fa-solid fa-trash" id="dltIcon" onClick={() => handleOpen(elem._id)}></i>
                <i className="fa-solid fa-pen-to-square" id="editIcon"></i>
              </Card>
            );
          })}
          <h4></h4>
        </div>
      </Container>

      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Deletion:-
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this note permanently?
            </Typography>
            <Button variant="success" onClick={() => deleteNote(id)} >Yes</Button>{' '}
            <Button variant="danger" style={{ float: "right" }} onClick={handleClose}>Cancel</Button>{' '}
          </Box>
        </Modal>
      </div>

    </>
  );
};

export default Home;
