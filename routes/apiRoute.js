//require fs, uuid (which will be the unique id on our object package), and our router
// const express = require("express");
const express = require("express");
const router = express.Router();
// const router = require("express").Router();
// const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

//TODO: write three main functions to interact with our db: get, post, and delete
//for anything but GET I will need a tool like insomnia or postman to test viability.
//browser is not designed for anything but GET requests (though I suppose I could make a form?)
//for each of our main CRUD actions (create, read, update, delete)


//this is our primary "get" route, which will declare const data to read whatever is in the db JSON and response by parsing string into a JSON object 
//note that the verbs (get, post, etc) are technically referencing different routes because they are different actions.
//each one follows the same model though: action + path
router.get("/notes", (req, res) => {
    const data = fs.readFileSync("./db/db.json");
    res.json(JSON.parse(data));
});

//big difference in POST is that posts include an entire data packet, or BODY.
//this is accessed as req.body within the route

router.post("/notes", (req, res) => {
    //here is our package request
    const addOurNote = req.body;
    const ourNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    //this is where things get interesting: we will be generating a UUID (Universally Unique Identifier) with a 128-bit value.
    //the UUID references a network address (i.e. our host), a randomly generated component, and a timestamp for when it is "printed"
    //this value is used to identify our objects and due to its nature it is almost impossible that there will be "collision" issues duplicating another packet of information
    //i'm not really which version to use- recommendation was v4, so we'll try that first.
    addOurNote.id = uuid.v4();
    ourNotes.push(addOurNote);
    //writes stringified object to our db folder.json
    //responds with updated notes 
    fs.writeFileSync("./db/db.json", JSON.stringify(ourNotes));
    res.json(ourNotes);
});

router.delete("/notes:id", (req, res) => {
    const ourNotes = JSON.parse(fs.readFileSync("./db/db/json"));
    const deleteNote = ourNotes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFile("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
})

module.exports = router;