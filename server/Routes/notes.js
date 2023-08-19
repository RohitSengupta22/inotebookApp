const Notes = require('../models/Notes')
//fetch notes of an user
const notes = async(req,res) =>{

    const notes = await Notes.find({user: req.data.id})
    res.send(notes)
}

module.exports = notes;