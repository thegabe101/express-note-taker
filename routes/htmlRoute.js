//we create a router to 1. practice 2. because we have multiple routes. 
//this is therefore a separation of concerns. placing the router here and in apiroutes allows us to have a server page and route server logic to two other pages.
const router = require('express').Router();
const path = require("path");
//we require node path here for routing our index page to correct spot in send function 
//create a routes to send user notes 

//struggled with this file path for awhile- named initial get method before realizing I needed to use parent directory /. 
//also learned to use .. correctly here to move up one level in subfolder
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})


router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//must always export router at bottom; our this is what allows for the modularization of our pages in this project. 
module.exports = router;

//TODO: Don't think I'm writing these file paths correctly. Need to look at model structure for parent/local directory path names and fix them. 