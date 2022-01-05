const express = require("express");
const cors = require("cors");
const app = express();
const bd = require("./Data/sqlite-db");

const http = require("http");
const io = require("socket.io");

const corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  next();
});

const server = http.createServer(app);
const socket = new io.Server(server, { cors: corsOptions });
socket.on("connection", () => {
  console.log("Connected to socket");
});

//==== Routers
const user = require("./Controllers/UserController");
const messages = require("./Controllers/MessagesController");

user(app, bd);
messages(app, bd, socket);

module.exports = { app, server };
