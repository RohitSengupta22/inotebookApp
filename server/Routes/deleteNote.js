const Notes = require('../models/Notes')

const deleteNote = async(req,res) =>{

const notes = await Notes.findById(req.params.id)

if(!notes){
    res.status(404).send("not found!!!")
}

if(notes.user.toString()===req.data.id){
    await Notes.deleteOne({_id: req.params.id})
    res.send("Note Deleted")
}

}

module.exports = deleteNote;