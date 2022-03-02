class MessagesDao {
  constructor(bd) {
    this.mysql = bd;
  }

  findPaginationMessages(chatId, PerPage, Page) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT * FROM messages WHERE chat_id = ? ORDER BY data_create DESC LIMIT ?,? ",
          [chatId, Page === 1 ? 0 : Page * PerPage, PerPage],
          (error, result, fields) => {
            if (error) {
              return reject({ error: error });
            }
            return resolve({
              response: result,
              count: result.length,
            });
          }
        );
      });
    });
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          `INSERT INTO messages (_id, content, data_create, chat_id, status,
          user_from_id, user_to_id) VALUES(?,?,?,?,?,?,?)`,
          [
            data.id,
            data.content,
            data.dataCreated,
            data.chatId,
            data.status,
            data.userFrom,
            data.userTo,
          ],
          (error, result, fields) => {
            if (error) {
              return reject({ error: error });
            }
            return resolve({
              response: data,
            });
          }
        );
      });
    });
  }

  updateByID(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          `UPDATE messages SET status = ? WHERE _id = ?`,
          [data.status, data.id],
          (error, result, fields) => {
            if (error) {
              return reject({ message: error });
            }
            return resolve({
              response: `Message Status Changed To ${data.status}`,
            });
          }
        );
      });
    });
  }

  deleteById(chatId, id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "DELETE FROM messages WHERE _id = ? AND user_from_id = ?",
          [chatId, id],
          (error, result, fields) => {
            if (error) {
              return reject({ message: error });
            }
            return resolve({
              response: "Message deleted successfully",
            });
          }
        );
      });
    });
  }

  DeleteAllMessagesById(id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "Delete FROM messages WHERE user_from_id = ? OR user_to_id = ?",
          [id, id],
          (error, result, fields) => {
            if (error) {
              return reject({ error: error });
            }
            return resolve({
              response: "successfully deleted messages",
            });
          }
        );
      });
    });
  }
}

module.exports = MessagesDao;
