const MessageDao = require("../Dao/MessagesDao");
const ChatsDao = require("../Dao/ChatsDao");
const UserDao = require("../Dao/UserDao");
const MessageModel = require("../Models/MessagesModel");

const MessagesController = (app, bd, socket) => {
  const newMessageDao = new MessageDao(bd);
  const newChatsDao = new ChatsDao(bd);
  const newUsersDao = new UserDao(bd);

  app.get("/messages/:chatId,:PP,:P", async (req, res) => {
    const chatId = req.params.chatId;
    const Page = Number(req.params.P);
    const PerPage = Number(req.params.PP);

    try {
      const data = await newMessageDao.findPaginationMessages(
        chatId,
        PerPage,
        Page
      );
      res.status(200).json({ ...data, error: false });
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

      const users = await newChatsDao.findById(body.chatId);
      if (users.response[0].status === "Pending") {
        throw new Error("this chat is pending");
      }
      const newMessageModel = new MessageModel(body, users.response[0], 0);

      const data = await newMessageDao.insert(newMessageModel);

      socket.emit(`message-created: ${newMessageModel.chatId}`, data);

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

  app.patch("/messages/notDisplayed", async (req, res) => {
    const { id } = req.body;
    try {
      const newMessagesModel = new MessageModel({ id: id }, "", 1);

      const data = await newMessageDao.updateByID(newMessagesModel);

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

  app.patch("/messages/displayed", async (req, res) => {
    const { id } = req.body;
    try {
      const newMessagesModel = new MessageModel({ id: id }, "", 2);

      const data = await newMessageDao.updateByID(newMessagesModel);

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

  app.delete("/messages/:id,:messageId", async (req, res) => {
    const id = req.params.id;
    const chatId = req.params.messageId;

    try {
      const user = await newUsersDao.findById(id);

      if (!user.response[0]) {
        throw new Error("User not exists");
      }

      const data = await newMessageDao.deleteById(chatId, id);

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
};

module.exports = MessagesController;
