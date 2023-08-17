const mongoose = require('mongoose')

const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {

    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'

  },
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
 },
  tags: {
    type: String,
    required: true,
    default: "General"

  },
  date:{
    type: Date,
    default: Date.now
  }
});

const Model2 = mongoose.model('Notes', NotesSchema);

module.exports = Model2;

