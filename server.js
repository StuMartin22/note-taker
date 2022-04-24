const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
// ---------ROUTER-----------------------------------------
const tips = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
tips.get('/', (req, res) => {
  readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
tips.post('/', (req, res) => {
  console.log(req.body);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newTip = {
      username,
      tip,
      topic,
      tip_id: uuid(),
    };

    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = tips;

// --------------STATIC----------------------------------
const express = require('express');

// Import our modular routers for /tips and /feedback
const tipsRouter = require('./tips');
const feedbackRouter = require('./feedback');

// const app = express();

app.use('/tips', tipsRouter);
app.use('/feedback', feedbackRouter);

module.exports = app;

// ----------------ROUTER--------------------------------------

const fb = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) =>
  readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { email, feedbackType, feedback } = req.body;

  // If all the required properties are present
  if (email && feedbackType && feedback) {
    // Variable for the object we will save
    const newFeedback = {
      email,
      feedbackType,
      feedback,
      feedback_id: uuid(),
    };

    readAndAppend(newFeedback, './db/feedback.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = fb;

// --------------GET/POSTS-------------------------------------------

//get route where /notes will take you to the notes html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//get route where anything will take you to public index html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// - Create a GET route for `/api/notes` that returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
// - Create a POST route for `api/notes` that saves a new note to the db.json file
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
});

