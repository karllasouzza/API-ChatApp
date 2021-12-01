const app = require("../app");
const UserDao = require("../Dao/UserDao");
const UserModel = require("../Models/UserModel");

const UserController = (app, bd) => {
  const newUserDao = new UserDao(bd);

  // GET ALL users
  app.get("/users", async (req, res) => {
    try {
      const data = await newUserDao.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Insert user
  app.post("/users", async (req, res) => {
    try {
      const body = req.body;
      const newUserModel = new UserModel(body);

      const data = await newUserDao.insert(newUserModel);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Get user by ID
  app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await newUserDao.findById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // GET user by email
  app.get("/users/seach/:email", async (req, res) => {
    const email = req.params.email;
    try {
      const data = await newUserDao.findByEmail(email);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });
};

module.exports = UserController;
