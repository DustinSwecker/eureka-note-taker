const notes = require('express').Router();
const { createUniqueID } = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

//get api route

notes.get('/', (req, res) => {
    //log a get request
    console.info(`${req.method} request recieved for notes`)
    //read from db.json file and return the data
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    
 });

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
            var parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=> err ? console.error(err): console.info(`\nData written to db.json`))
            
            };
            });
        };
    });




notes.delete('/:id', (req,res) => {
    console.info(`${req.method} request recieved for notes`);
    //readfile to grab the existing array of objects
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //variables to suss out the necessary data
            const parsedData = JSON.parse(data);
            const ID = req.params.id;
            //map function to pick out the index of the object that has the matching id borrowed from a  stack overflow answer at https://stackoverflow.com/questions/10557486/in-an-array-of-objects-fastest-way-to-find-the-index-of-an-object-whose-attribu
            const arrayIndex = parsedData.map(function(x) {return x.id}).indexOf(ID);
            //removing the item based on the above index number
            parsedData.splice(arrayIndex,1);
            //writing the resulting array of objects to the db.json file
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=> err ? console.error(err): console.info(`\n Data deleted.`))
            };
        })
    })


module.exports = notes;