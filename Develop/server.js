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
