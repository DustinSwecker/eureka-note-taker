const express = require('express');

//import modular router for post, get, and delete api notes
const apiNotesRouter = require('./apinotes');

const app = express();

app.use('/notes', apiNotesRouter);

module.exports = app;