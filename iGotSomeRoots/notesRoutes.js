// ---------ROUTER-----------------------------------------
const notes = require('express').Router();
const { readIt, readItAddIt } = require('../helpFiles/readWrite');
const randomID = require('../helpFiles/idGenerator');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readIt('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a newNote
notes.post('/', (req, res) => {
  req.body = {
    id: randomID(),
    title: req.body.title,
    text: req.body.text,
  }
  res.JSON(readItAddIt(req.body, "./db/db.json"))
});


//read and append newNote to the db.json file



//ship that puppy off.
module.exports = notes;
