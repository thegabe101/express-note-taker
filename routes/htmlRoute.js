//after review of index.js, it looks like we need routing for POST, GET, and DELETE
const path = require("path");
//we require node path here for routing our index page to correct spot in send function 
//create a routes to send user notes 
function sendUser (app) {
    app.get("/notes", function (req, res){
        res.sendFile(path.join(__dirname + "/../public/notes/html"));
    });

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
};

//TODO: Don't think I'm writing these file paths correctly. Need to look at model structure for parent/local directory path names and fix them. 