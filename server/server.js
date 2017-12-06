var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;


app.listen(8080);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));


app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));


var db = new Db('tutor',new Server("localhost", 27017, {safe: true},{auto_reconnect: true}, {}));

db.open(function(err){

    db.collection('notes', function(error, notes) {
        db.notes = notes;
    });

    db.collection('sections', function(error, sections) {
        db.sections = sections;
    });

    if (err) console.log(err);
    else console.log("mongo db is opened!");
});

app.get("/notes", function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");

    // console.log("reading notes", req.session.notes);
    // if (!req.session.notes) {
    //     req.session.notes = notes_init;
    // }
    // res.send(req.session.notes);


    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});


app.post("/notes", function(req,res) {
    var note = req.body;
    // console.log("adding note", req.session.notes);
    // req.session.notes.push(note);
    // res.end();

    db.notes.insert(req.body).then(function() {
        res.end();
    });
});


app.delete("/notes", function(req,res) {
    console.log("deleting with id "+req.query.id);
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});


//sections
app.get("/sections", function(req,res) {
    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});