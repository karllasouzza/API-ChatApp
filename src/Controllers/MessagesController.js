const MessageDao = require("../Dao/MessagesDao");
const MessageModel = require("../Models/MessagesModel");

const MessagesController = (app, bd, socket) => {
  const newMessageDao = new MessageDao(bd);

  app.get("/messages", async (req, res) => {
    try {
      const data = await newMessageDao.findAll();
      res.status(200).json({ data, error: false });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Insert Message
  app.post("/messages", async (req, res) => {
    try {
      const body = req.body;
      const newMessageModel = new MessageModel(body);

      const data = await newMessageDao.insert(newMessageModel);

      socket.emit("message-created", data);

      res.status(200).json({
        Response: data,
        error: false,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });
};

module.exports = MessagesController;
