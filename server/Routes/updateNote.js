const Notes = require('../models/Notes.js');

const updateNote = async (req, res) => {
  const { title, description, tags } = req.body;
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tags) {
    newNote.tags = tags;
  }

  try {
    let notes = await Notes.findById(req.params.id);

    if (!notes) {
      return res.status(404).send("Note not found");
    }

    if (notes.user.toString() === req.data.id) {
      await Notes.findByIdAndUpdate(req.params.id, { $set: newNote });
      res.send(newNote);
      console.log(notes.user.toString()+" "+req.data.id)
     
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = updateNote;
