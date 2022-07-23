//TODO: What dependencies do I need? NPMs? 
//The first thing to do is to figure out waht dependencies I need.
//Will certainly need express for server base and fs for reading and writing file system. Not sure what else yet. 
//Thinking I will need path as well but less sure.

const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");

//next we will have some server boilerplate that I'll reference my in-class exercises for bcause I'm not great at recalling how to write it yet. 


//references environment port OR if nothing is there to listen on port 3000. I think this is pretty traditional fare for an app like this from what I'm seeing online. 
const PORT = process.env.PORT || 3000;
//setting our app variable which can be exported if need be. 
const app = express();

//more boilerplate here
//urlenconded ensures that middleware will only look at eligible bodies.
//app.use in general seems to be a "binder." The only way it makes sense to me in English is as a "mount" that enables the server to respond to and only to routes beginning with the specified app.use paths. 
app.use(express.urlencoded({ extended: true}));
app.use(express.json);

//need to declare middleware. middleare should direct to the public folder where our front-end assets are, I believe. This is generally called public but I don't actually know if it "has" to be called public. 
//develop points to parent folder and public points to draw folder
//static allows for detection of static files like the CSS that would otherwise not be applied
app.use(express.static("./develop/public"));

//now we need to determine the get routes and pipes, as well as what we are posting. 
//I assume this will only use GET and POST but not sure yet. 
//TODO: Take a closer look at the user story and projected app to determine what our goal is here. 