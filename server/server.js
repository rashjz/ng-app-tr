var express = require('express');
var app = express();
var path = require('path');



app.get("/notes", function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    var notes = [
        {text: "First note"},
        {text: "Second note"},
        {text: "Third note"}
    ]
    res.send(notes);
}).listen(8080);


/*

FOLDER STRUCTURE:

root
  app 
  server
     server.js
	 package.json
  index.html
  package.json
  
*/
  