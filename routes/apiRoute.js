//learned from ta to specify router in one line rather than loading express twice
const router = require('express').Router();
const { json } = require('express');
const fs = require("fs");
const uuid = require("uuid");

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
    addOurNote.id = uuid.v4();
    ourNotes.push(addOurNote);
    //writes stringified object to our db folder.json
    //responds with updated notes 
    fs.writeFileSync("./db/db.json", JSON.stringify(ourNotes));
    res.json(ourNotes);
});


//initially tried a filter here using req parameters id to create a const that would respond as a deleted note. ineffective
router.delete("/api/notes/:id", (req, res) => {
    const ourNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deletedNote = ourNotes.filter ((killNote) => killNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify)
    res.json(deletedNote);
})

//TODO: understand sync. tried to remove sync from all read write functions and seemed to destroy callback functions containing.
//still need to export router as this path is also utilized by server.js.
module.exports = router;