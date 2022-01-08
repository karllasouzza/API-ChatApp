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

  app.get("/messages/scroll/:PP,:P", async (req, res) => {
    const Page = Number(req.params.P);
    console.log(Number(req.params.P));
    const PerPage = Number(req.params.PP);
    console.log(Number(req.params.PP));

    try {
      const data = await newMessageDao.findPaginationMessages(PerPage, Page);
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
