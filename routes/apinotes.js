const notes = require('express').Router();
const { createUniqueID } = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');

//promise version of fs.readfile
const readFromFile = util.promisify(fs.readFile);

notes.post('/', (req, res)=> {
    console.info(`${req.method} request recieved for notes`)
    console.log(req.body);
    //obj destructuring setting title and text as variables
    const { title, text } = req.body;
    //if req.body has content, create a new object from the body called newNote
    if (req.body) {
        const newNote = {
            title,
            text,
            id: createUniqueID(),
        };
    //read from the database json to compile the array of objects to contain the notes then write the newNote to the file
        readFromFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            } else {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=> err ? console.error(err): console.info(`\nData written to db.json`))
            }
        });
    };
});

module.exports = notes;