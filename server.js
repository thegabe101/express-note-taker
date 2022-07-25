//installed npm list:

//npm i -y
//npm jest
//npm uniqid
//npm init
//npm install express

//TODO: What dependencies do I need? NPMs? 
//The first thing to do is to figure out waht dependencies I need.
//Will certainly need express for server base and fs for reading and writing file system. Not sure what else yet. 
//Thinking I will need path as well but less sure.
const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const util = require("util");
// const path = require("path");
const htmlRoute = require("./routes/htmlRoute.js");
const apiRoute = require("./routes/apiRoute.js");
// const { dirname } = require("path");
//next we will have some server boilerplate that I'll reference my in-class exercises for bcause I'm not great at recalling how to write it yet. 

const app = express();
//references environment port OR if nothing is there to listen on port 3000. I think this is pretty traditional fare for an app like this from what I'm seeing online. 
const PORT = process.env.PORT || 3000;
//setting our app variable which can be exported if need be. 
//App just creates an individual instance of our server. 


//more boilerplate here
//urlenconded ensures that middleware will only look at eligible bodies.
//app.use in general seems to be a "binder." The only way it makes sense to me in English is as a "mount" that enables the server to respond to and only to routes beginning with the specified app.use paths. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json);

//need to declare middleware. middleare should direct to the public folder where our front-end assets are, I believe. This is generally called public but I don't actually know if it "has" to be called public. 
//develop points to parent folder and public points to draw folder
//static allows for detection of static files like the CSS that would otherwise not be applied
//dirname is necessary because our file path will be dynamic and express does not support a relative filepath- it requires absolute filepath
// app.use(express.static(path.join(__dirname + "./develop/public")));
//getting middleware crash. says its getting an object.
app.use(express.static("public"));
//now we need to determine the get routes we are using, as well as what we are posting. 
//I assume this will only use GET and POST but not sure yet.  
//TODO: Take a closer look at the user story and projected app to determine what our goal is here. 
//we will want to set up our API routes in a separate file for separations of concerns purposes and require them here + defined
//theoretically I think I could do all of this in one file, but it would require instilling asynchronicity which I am still not completely comfortable with.
//here we will utilize the two external routes we set aside as variables earlier, api and html
// / = this directory 
app.use("/", htmlRoute);
app.use("/api", apiRoute);

// app.get("/", (req, res) => {
//     res.sendFile(path.join(dirname, "./assets/index.html"));
// });

// app.get("/notes", (req, res) => {
//     res.sendFile(path.join(dirname, "./assets/notes.html"));
// });
//we will want to open our port before we are done and confirm back-end that the server is listening. Can use .listen + a simple function that will log our success.
//this is just literally where the server is listening for requests.
//the networks requests are actually MADE with tools like Insomnia or our browser, but this is where we mock this computer being a "different one" by listening. 
//we concatonate here because PORT technically has two possible values, 3000 or the environmental value.
// app.listen(PORT, weAreListening => {
//     console.log("Server is up. Base URL is https://localhost/" + PORT);
// });
app.listen(PORT, function () {
    console.log("server is up at http://localhost/" + PORT);
});
//with server set it up it's important to examine the fetch requests in index.js
//this is because we need to determine what urls our fetch requests are referencing
//fetch requests will hit the URL (ignoring the endpoint) and fetching the response + logging it into JSON
//the fetch requests are not actually file pathing, they are network requests
// module.exports = router;