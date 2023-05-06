//connect express, path, and set up routes

const express = require('express');
const path = require('path');
const api = require ('./routes/index');


//as per express documentation, adding app variable to activate express scripts
const app = express();

//set PORT
const PORT = process.env.PORT || 3590;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to grab the api routes
app.use('/api', api);

//setting express to use the /public folder as the starting directory
app.use(express.static('public'));

//get path to return the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);


//get path to return the index.html if the domain is entered
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


