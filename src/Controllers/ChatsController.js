const ChatsDao = require("../Dao/ChatsDao");
const ChatsModel = require("../Models/ChatsModel");

const ChatsController = (app, bd) => {
  const newChatsDao = new ChatsDao(bd);

  // Get all chats by userID
  app.get("/chats/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await newChatsDao.findAllById(id);

      res.status(200).json({
        ...data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  app.get("/chats/requests/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await newChatsDao.findRequestsById(id, "Pending");
      res.status(200).json({
        ...data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Update chat request pending
  app.post("/chats/pending", async (req, res) => {
    try {
      const { userTo, userFrom } = req.body;

      const newChatsModel = new ChatsModel("", userTo, userFrom, 0);
      const data = await newChatsDao.insert(newChatsModel);

      res.status(200).json({
        ...data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Update chat request accepted
  app.patch("/chats/accepted", async (req, res) => {
    const { id } = req.body;
    try {
      const newChatsModel = new ChatsModel(id, "", "", 1);

      const data = await newChatsDao.updateByID(newChatsModel);

      res.status(200).json({
        ...data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Update chat request denied
  app.patch("/chats/denied", async (req, res) => {
    const { id } = req.body;
    try {
      const newChatsModel = new ChatsModel(id, "", "", 2);

      const data = await newChatsDao.updateByID(newChatsModel);

      res.status(200).json({
        ...data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Delete chat by ID
  app.delete("/chats/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await newChatsDao.deleteById(id);
      res.status(200).json({ ...data, error: false });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });
};

module.exports = ChatsController;
