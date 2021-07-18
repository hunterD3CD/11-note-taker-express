// Dependencies
// =============================================================
// --------------------node modules: express, path, and fs----------------
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
// --------------------database file and port connection-------------------
const PORT = process.env.PORT || 3000;

const database = require("./db/db");
// -------------------link to the public folder----------------------------
app.use(express.static("public"));
// --------------------Sets up the Express app to handle data parsing-------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
// -----------------display html file on the web----------------------------
app.get("/", function (req, res) {
  // transfer the file at the given path
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Data
// =============================================================
app
  .route("/api/notes")
  .get(function (req, res) {
    res.json(databse);
  })

  .post(function (req, res) {
    let dbFilePath = path.join(__dirname, "/db/db.json");
    let addNote = req.body;
    let maxId = 99;

    for (let i = 0; i < databse.length; i++) {
      let existNote = database[i];
      if (existNote.id > maxId) {
        maxId = existNote.id;
      }
    }
    addNote.id = maxId + 1;
    database.push(addNote);

    // use fs module to update db.json file with added note
    fs.writeFile(dbFilePath, JSON.stringify(database), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(" the note is added to the databse");
    });
    res.json(addNote);
  });

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
