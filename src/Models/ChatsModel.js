const { v4: uuidv4 } = require("uuid");
class ChatsModel {
  static Status(number) {
    switch (number) {
      case 1:
        return "Accepted";

      case 2:
        return "Denied";

      default:
        return "Pending";
    }
  }
  constructor(id, userTo, userFrom, statusNumber) {
    this.id = id ? id : uuidv4();
    this.userTo = userTo;
    this.userFrom = userFrom;
    this.status = ChatsModel.Status(statusNumber);
  }
}
module.exports = ChatsModel;
