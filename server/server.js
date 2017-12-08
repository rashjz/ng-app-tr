var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;


var root = __dirname + '/..'
app.use(express.static(root));


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
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});


app.post("/notes", function(req,res) {
    var note = req.body;

    // console.log("adding note", req.session.notes);
    // req.session.notes.push(note);
    // res.end();

    db.notes.insert(note).then(function() {
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
    console.log(req.query+' ;::::::::')

    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.post("/sections/replace", function(req,resp) {
    // do not clear the list
    if (req.body.length==0) {
        resp.end();
    }
    db.sections.remove({}, function(err, res) {
        if (err) console.log(err);
        db.sections.insert(req.body, function(err, res) {
            if (err) console.log("err after insert",err);
            resp.end();
        });
    });
});

app.delete("/sections", function(req,res) {
    console.log("deleting with id "+req.query.id);
    var id = new ObjectID(req.query.id);
    db.sections.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.get("/viewSection/*", function(req, res, next) {
    var url = req.originalUrl.replace("/viewSection/","");
    if (url.match("app/*|node_modules/*|systemjs.config.js|css/*|fonts/*") )
        res.sendFile(url, { root : root });
    else res.sendFile('index.html', { root : root });
});


app.post("/login", function(req,res) {
    db.users.find(
        {userName:req.body.userName,password:req.body.password})
        .toArray(function(err, items) {
            if (items.length>0) {
                req.session.userName = req.body.username;
            }
            res.send(items.length>0);
        });
});

app.get("/logout", function(req, res) {
    req.session.userName = null;
    res.end();
});


app.get("*", function(req, res, next) {
    res.sendFile('index.html', { root : root });
});