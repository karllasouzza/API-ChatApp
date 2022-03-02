const express = require("express");
const cors = require("cors");
const app = express();

const mysql = require("./Data/config").pool;

const http = require("http");
const io = require("socket.io");

const sha256 = require("js-sha256");

const corsOptions = {
  origin: ["http://localhost:3000", "https://silly-ritchie-d3d880.netlify.app"],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  next();
});

// Multer (Upload)
const multer = require("multer");
const upload = multer({
  image: {
    type: Buffer,
  },
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});

const server = http.createServer(app);
const socket = new io.Server(server, { cors: corsOptions });

//==== Routers
const user = require("./Controllers/UserController");
const chats = require("./Controllers/ChatsController");
const messages = require("./Controllers/MessagesController");

user(app, mysql, sha256, upload);
chats(app, mysql);
messages(app, mysql, socket);

module.exports = { app, server };
