const express = require("express");
const path = require("path");
const fs = require("fs");
var notes = fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8");
notes = JSON.parse(notes);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Set up routes and data handling
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
app.get("/api/notes", function(req, res) {
    res.json(JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json"), 'utf8')));
  });
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
//post
app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  newNote.id = notes.length;
  notes.push(newNote);
  let stringifiedNotes = JSON.stringify(notes);
  fs.writeFile("db/db.json", stringifiedNotes, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
  res.json(newNote);
});
//delete
app.delete("/api/notes/:id", function(req, res) {
  console.log(req);
  const targetNote = parseInt(req.body.id);
  notes.splice(targetNote, 1);
  for(let i = 0; i < notes.length; i++){
    notes[i].id = i;
  }
  let stringifiedNotes = JSON.stringify(notes);
  fs.writeFile("db/db.json", stringifiedNotes, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was deleted!");
  });
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });  