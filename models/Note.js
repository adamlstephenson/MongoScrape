const mongoose = require("mongoose");

//Reference to the Schema constructor
const Schema = mongoose.Schema;

//NoteSchema object
const NoteSchema = new Schema({
    title: String,
    body: String
});

//Model creation
const Note = mongoose.model("Note", NoteSchema);

//Export
module.exports = Note;