const express = require('express');



const auth = require('../Routes/auth.js')
const login = require('../Routes/login.js')
const notes = require('../Routes/notes.js')
const createUser = require('../Routes/createUser.js')
const fetchuser = require('../middlewares/fetchuser.js')
const createNote = require('../Routes/CreateNote.js')
const updateNote = require('../Routes/updateNote.js')
const deleteNote = require('../Routes/deleteNote.js')
const { query,body,validationResult } = require('express-validator');

const router = express.Router();

router.post('/auth',auth);
router.post('/auth/login',login);
router.get('/notes',fetchuser,notes);
router.post('/auth/createuser',fetchuser,createUser)
router.post('/notes/createNote',fetchuser,createNote)
router.put('/notes/updateNote/:id',fetchuser,updateNote)
router.delete('/notes/delete/:id',fetchuser,deleteNote)

module.exports = router;