const UserDao = require("../Dao/UserDao");
const ChatsDao = require("../Dao/ChatsDao");
const MessagesDao = require("../Dao/MessagesDao");
const UserModel = require("../Models/UserModel");

const UserController = (app, bd, sha256, upload) => {
  const newUserDao = new UserDao(bd);
  const newChatsDao = new ChatsDao(bd);
  const newMessagesDao = new MessagesDao(bd);

  // GET ALL users
  app.get("/users", async (req, res) => {
    try {
      const data = await newUserDao.findAll();
      res.status(200).json({ ...data, error: false });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        error: true,
      });
    }
  });

  // Post user
  app.post("/users", async (req, res) => {
    try {
      const body = req.body;
      const newUserModel = new UserModel(body);

      const data = await newUserDao.insert(newUserModel, res);

      console.log(data);

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

  // Get user by ID
  app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await newUserDao.findById(id);
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

  app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = sha256(req.body.password);

    try {
      const data = await newUserDao.findByEmailAndPassword(email, password);
      res.json({ ...data.response, error: false });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });

  // GET user by email
  app.get("/users/search/:email", async (req, res) => {
    const email = req.params.email;
    try {
      const data = await newUserDao.findByEmail(email);
      res.status(200).json({ ...data, error: false });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });

  // Post image by ID
  app.post(
    "/users/upload",
    upload.single("upload"),
    async (req, res) => {
      try {
        const data = await newUserDao.addProfileImg(
          req.body.id,
          req.file.buffer
        );
        res.send({ ...data, error: false });
      } catch (e) {
        res.status(400).send(e);
      }
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );

  // Get Image by ID
  app.get("/users/:id/img", async (req, res) => {
    try {
      const data = await newUserDao.findById(req.params.id);
      if (!data.response[0] || !data.response[0].thumbnail) {
        throw new Error();
      }
      //response header, use set
      res.set("Content-Type", "image/png");
      res.send(data.response[0].thumbnail);
    } catch (e) {
      res.status(404).send();
    }
  });

  // Update user by ID
  app.patch("/users/:id", async (req, res) => {
    const body = req.body;
    try {
      const oudDatas = await newUserDao.findByIdFullRows(body.id);

      const data = await newUserDao.updateByID(body.id, {
        name: body.name ? body.name : oudDatas.response[0].name,
        email: body.email ? body.email : oudDatas.response[0].email,
        password: body.password ? body.password : oudDatas.response[0].password,
        thumbnail: body.thumbnail
          ? body.thumbnail
          : oudDatas.response[0].thumbnail,
        bio: body.bio ? body.bio : oudDatas.response[0].bio,
      });

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

  // Delete the user by ID
  app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await newMessagesDao.DeleteAllMessagesById(id);
      await newChatsDao.DeleteAllChatsById(id);
      const data = await newUserDao.deleteById(id);

      res.status(200).json({ ...data, error: false });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });
};

module.exports = UserController;
