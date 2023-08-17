const Notes = require('../models/Notes.js')

const createNote = async(req,res) =>{

    try{
        const {title,description,tags} = req.body;

        const notes = new Notes({title,description,tags,user: req.data.id});

        if(title.length>=5 && description.split(' ').length>=5){
            
        const savedNote = await notes.save();
        res.send(savedNote);
        console.log(notes.user.toString())
        }else{
            res.send("title should be min 5 characters and description should be min 10 words")
        }
    
    } catch(error){
        console.log(error)
    }
  

}

module.exports = createNote;