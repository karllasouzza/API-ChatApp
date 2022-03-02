const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

class MessagesModel {
  static Status(number) {
    switch (number) {
      case 1:
        return "Not Displayed";

      case 2:
        return "Displayed";

      default:
        return "Delivered";
    }
  }
  constructor(body, users, statusNumber) {
    this.id = body.id ? body.id : uuidv4();
    this.content = body.content ? body.content : "";
    this.status = MessagesModel.Status(statusNumber);
    this.dataCreated = moment().format();
    this.chatId = body.chatId ? body.chatId : "";
    this.userTo = users.user_to ? users.user_to : "";
    this.userFrom = users.user_from ? users.user_from : "";
  }
}
module.exports = MessagesModel;
