-> npm install
-> npm start

using server lite
// "start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",

Install Express by typing in server folder:
-> npm install express

Otherwise you can create package.json by typing npm init, and then execute
-> npm install express --save
It will add express to package.json.

Execute server on port 8080:
-> node server.js

Also we need to install express-session to Node server. Type this in server folder:
-> npm install express-session --save

Using Mongo db in node JS
add dependency
"mongodb": "*"
run : npm install

-> C:\Program Files (x86)\MongoDB\Server\3.2\bin>mongod --storageEngine=mmapv1 --dbpath "D:\MongoDB"

-> goto mongodb bin start mongo
use tutor
db.notes.insert({text:"my note"})
db.notes.find()
db.notes.update({text:"my note"}, { $set:{text:"her note"}},{upsert:true})
db.notes.update({}, {$set:{lastUpdated:new Date().getTime()}})

# You will see that only one item is updated. To update all items, you need to add {multi:true} parameter:
db.notes.update({}, {$set:{lastUpdated:new Date().getTime()}}, {multi:true})
db.notes.update({}, {$set: {section:"Old notes" }}, {multi:true});

db.sections.insert({title:"Work"});
db.sections.insert({title:"Vacations"});
db.sections.insert({title:"Children"});
db.notes.insert({section:"Work", text:"test work note"});