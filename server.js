// Initialize the Express app
const express = require('express');
const req = require('express/lib/request');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const randomID = require('./helpFiles/idGenerator')
// Set body parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// Set up the port that your server will listen on
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


// --------------GET/POSTS-------------------------------------------


//get route where anything will take you to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route where /notes will take you to the notes html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//Create a POST route for `api/notes` that saves a new note to the db.json file
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
});
