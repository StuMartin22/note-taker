// ---------ROUTER-----------------------------------------
const notes = require('express').Router();
const { readIt, readItAddIt } = require('../helpFiles/readWrite');
const randomID = require('../helpFiles/idGenerator');

// GET Route for retrieving all the notes
function getNotes() {
notes.get('/', (req, res) => {
  readIt('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
};

// POST Route for a newNote
notes.post('/', (req, res) => {
  console.log(req.body);
//declare body as the title and text of a note
  const { title,text } = req.body;
//if the body is requested declare a newNote object thats title, text, and a randomID
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: randomID(),
    };
//read and append newNote to the db.json file
    readItAddIt(newNote, './db/db.json');
    res.json(`Note added. Very nice.`);
  } else {
    res.error('Oop try again.');
  }
});
//ship that puppy off.
module.exports = getNotes;
