const router = require('express').Router();
const path = require("path");
//we require node path here for routing our index page to correct spot in send function 
//create a routes to send user notes 

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});


module.exports = router;

//TODO: Don't think I'm writing these file paths correctly. Need to look at model structure for parent/local directory path names and fix them. 