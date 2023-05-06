const notes = require('express').Router();
const { createUniqueID } = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');

//promise version of fs.readfile


//get api route

notes.get('/', (req, res) => {
    //log a get request
    console.info(`${req.method} request recieved for notes`)
    //read from db.json file and return the data
    fs.readFile('./db/db.json').then((data)=>
    res.json(JSON.parse(data)));
})

//post api route
notes.post('/', (req, res)=> {
    console.info(`${req.method} request recieved for notes`)
    

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
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
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