var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];
var bodyParser = require('body-parser')
app.listen(8080);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));


app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get("/notes", function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

    console.log("reading notes", req.session.notes);
    if (!req.session.notes) {
        req.session.notes = notes_init;
    }
    res.send(req.session.notes);
});


app.post("/notes", function(req,res) {
    var note = req.body;
    console.log("adding note", req.session.notes);
    req.session.notes.push(note);
    res.end();
});


