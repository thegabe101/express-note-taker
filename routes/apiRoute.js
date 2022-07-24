//require fs, uuid (which will be the unique id on our object package), and our router

const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

//TODO: write three main functions to interact with our db: get, post, and delete
//for anything but GET I will need a tool like insomnia or postman to test viability.
//browser is not designed for anything but GET requests (though I suppose I could make a form?)
//for each of our main CRUD actions (create, read, update, delete)


//this is our primary "get" route, which will declare const data to read whatever is in the db JSON and response by parsing string into a JSON object 
router.get("/notes", (req, res) => {
    const data = fs.readFile("./db/db.json");
    res.json(JSON.parse(data));
});

