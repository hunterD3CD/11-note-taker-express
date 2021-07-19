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
  // GET request serve the purpose of retrieving data from server and send it back to the client
  .get(function (req, res) {
    res.json(databse);
  })
  // -----------------import the new note to the database file------------------
  .post(function (req, res) {
    let dbFilePath = path.join(__dirname, "/db/db.json");
    let addNote = req.body;
    let maxId = 99;
    // For loop maxID
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
      console.log("the note is added to the database");
    });
    res.json(addNote);
  });
// --------------------remove the note from the database file-------------------
app.delete("/api/notes/:id", function (req, res) {
  let dbFilePath = path.join(__dirname, "/db/db.json");

  for (let i = 0; i < database.length; i++) {
    if (database[i].id == req.params.id) {
      database.splice(i, 1);
      break;
    }
  }
  // use fs module to update db.json file with deleted note
  fs.writeFileSync(dbFilePath, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("the note is removed from the database");
    }
  });
  res.json(database);
});

// Listener
// =============================================================
app.listen(PORT, () => {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});
