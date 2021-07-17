// Dependencies
// =============================================================
// --------------------node modules: express, path, and fs----------------
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
// --------------------database file and port connection-------------------
const PORT = 3000;
const database = require("./db/db");
// -------------------link to the public folder----------------------------
app.use(express.static("public"));
// --------------------Sets up the Express app to handle data parsing-------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
