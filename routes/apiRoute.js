//learned from ta to specify router in one line rather than loading express twice
const router = require('express').Router();
const { json } = require('express');
const fs = require("fs");
const uuid = require("uuidv4");

//TODO: write three main functions to interact with our db: get, post, and delete
//for anything but GET I will need a tool like insomnia or postman to test viability.



//this is our primary "get" route, which will declare const data to read whatever is in the db JSON and response by parsing string into a JSON object 
//still unsure whether or not I need sync on my read and writes. this method is still confusing to me. will try with and then without.
//each one follows the same model though: action + path
router.get("/api/notes", (req, res) => {
    const data = fs.readFileSync("./db/db.json");
    res.json(JSON.parse(data));
});

//big difference in POST is that posts include an entire data packet, or BODY.
//this is accessed as req.body within the route

router.post("/api/notes", (req, res) => {
    //here is our package request
    const addOurNote = req.body;
    //parses JSON read file db, allows us to grab object as ourNotes
    const ourNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    //this value is used to identify our objects and due to its nature it is almost impossible that there will be "collision" issues duplicating another packet of information
    //i'm not really which version to use- recommendation was v4, so we'll try that first.
    addOurNote.id = uuid;
    ourNotes.push(addOurNote);
    //writes stringified object to our db folder.json
    //responds with updated notes 
    fs.writeFileSync("./db/db.json", JSON.stringify(ourNotes));
    res.json(ourNotes);
});


//initially tried a filter here using req parameters id to create a const that would respond as a deleted note. ineffective
//will now try doing something similar: take note body list from db and req param: id. 
//then pick out all the notes that DO NOT match the selected id. once this list is returned, rewrite the file as an updated db.json
//essentially this is a rewrite of the list 
router.delete("/api/notes/:id", (req, res) => {
    //note that ourNotes should be a let variable here because we will reassign it momentarily
    let ourNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deletedNote = (req.params.id).toString();
    //now we filter out (into an array) any notes that do NOT match the params.id
    ourNotes = ourNotes.filter(eraseSelectedNote => {
        //return them as a new id
        return eraseSelectedNote.id != deletedNote;
    })
    //rewrite file
    fs.writeFileSync("./db/db.json", JSON.stringify(ourNotes));
    res.json(ourNotes);
})

//TODO: understand sync. tried to remove sync from all read write functions and seemed to destroy callback functions containing.
//still need to export router as this path is also utilized by server.js.
module.exports = router;