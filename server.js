// Initialize the Express app
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const notesRouter = require('./iGotSomeRoots/notesRoutes')
// Set body parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use("/api/notes",notesRouter)
// --------------GET/POSTS-------------------------------------------

//get route where /notes will take you to the notes html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//get route where anything will take you to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Set up the port that your server will listen on
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));