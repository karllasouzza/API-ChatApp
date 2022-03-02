class ChatsDao {
  constructor(bd) {
    this.mysql = bd;
  }

  findAllById(id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT * FROM chats WHERE user_to = ? OR user_from = ?",
          [id, id],
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

  findRequestsById(id, status) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT * FROM chats WHERE user_to = ? OR user_from = ? AND status = ?",
          [id, id, status],
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
          "INSERT INTO chats (_id, user_to, user_from, status) VALUES (?,?,?,?)",
          [data.id, data.userTo, data.userFrom, data.status],
          (error, result, field) => {
            conn.release();
            if (error) {
              return reject({
                error: error,
                response: null,
              });
            }
            resolve({
              id: data.id,
            });
          }
        );
      });
    });
  }

  updateByID(data) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          `UPDATE chats SET status = ? WHERE _id = ?`,
          [data.status, data.id],
          (error, result, fields) => {
            if (error) {
              return reject({ message: error });
            }
            return resolve({
              response: `Chat Status Changed To ${data.status}`,
            });
          }
        );
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT * FROM chats WHERE _id = ?",
          id,
          (error, result, fields) => {
            if (error) {
              return reject({ error: error });
            }
            return resolve({
              response: result,
            });
          }
        );
      });
    });
  }

  async deleteById(id) {
    try {
      const chat = await this.findById(id);

      if (!chat.error) {
        return new Promise((resolve, reject) => {
          this.mysql.getConnection((error, conn) => {
            if (error) {
              return reject({ error: error });
            }
            conn.query(
              "DELETE FROM chats WHERE _id = ?",
              id,
              (error, result, fields) => {
                if (error) {
                  return reject({ message: error });
                }
                return resolve({
                  response: "Chat Deleted successfully",
                });
              }
            );
          });
        });
      } else {
        throw new Error("The chat require non exists");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  DeleteAllChatsById(id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "Delete FROM chats WHERE user_from = ? OR user_to = ?",
          [id, id],
          (error, result, fields) => {
            if (error) {
              return reject({ error: error });
            }
            return resolve({
              response: "Successfully deleted chats",
            });
          }
        );
      });
    });
  }
}

module.exports = ChatsDao;
