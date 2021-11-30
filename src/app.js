const express = require("express");
const cors = require("cors");
const app = express();
const bd = require("./Data/sqlite-db");

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  next();
});
app.use(cors());

//==== Routers
const user = require("./Controllers/UserController");

user(app, bd);

module.exports = app;
