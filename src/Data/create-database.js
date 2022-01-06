const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const caminhoArq = path.resolve(__dirname, "database.db");

const db = new sqlite3.Database(caminhoArq);

const pragma = `PRAGMA foreign_keys = ON`;

function enableForeignKey() {
  db.run(pragma, (error) => {
    if (error) console.log("Error in process of creation exec 'pragma'");
  });
}

//==== Usuários
const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "USERS" (
    "ID" VARCHAR(50)  PRIMARY KEY,
    "NAME" varchar(80),
    "EMAIL" varchar(80) UNIQUE,
    "PASSWORD" varchar(100)
    );`;

function CreateTableUser() {
  db.run(USERS_SCHEMA, (error) => {
    if (error) console.log("Error in process of creation table 'USERS'");
  });
}

//====  Message
const MESSAGE_SCHEMA = `
CREATE TABLE IF NOT EXISTS "MESSAGE" (
    ID VARCHAR(50) PRIMARY KEY, 
    CONTENT TEXT,
    DATACREATE DATATIME,
    ID_USERS VARCHAR(50),
    FOREIGN KEY(ID_USERS) REFERENCES USERS(ID)
);`;

function CreateTableMessage() {
  db.run(MESSAGE_SCHEMA, (error) => {
    if (error) console.log("Error in process of creation table 'MESSAGE'");
  });
}

db.serialize(() => {
  enableForeignKey();
  CreateTableUser();
  CreateTableMessage();
});
