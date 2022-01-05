const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

class MessagesModel {
  constructor(body) {
    this.id = uuidv4();
    (this.content = body.content),
      (this.user_id = body.id),
      (this.dataCreated = moment().format());
  }
}
module.exports = MessagesModel;
