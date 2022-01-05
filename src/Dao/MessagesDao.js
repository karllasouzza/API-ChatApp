class MessagesDao {
  constructor(bd) {
    this.bd = bd;
  }

  findAll() {
    const SELECT_ALL = "SELECT * FROM 'MESSAGE'";
    return new Promise((resolve, reject) => {
      this.bd.all(SELECT_ALL, (error, rows) => {
        if (error) {
          reject({
            message: error.message,
          });
        } else {
          resolve({
            response: rows,
            count: rows.length,
          });
        }
      });
    });
  }
  insert(data) {
    return new Promise((resolve, reject) => {
      this.bd.run(
        `INSERT INTO MESSAGE (CONTENT, DATACREATE, ID_USERS) VALUES(?,?,?)`,
        [data.content, data.dataCreated, data.user_id],
        (error) => {
          if (error) {
            reject({
              message: error.message,
            });
          } else {
            resolve({
              response: data,
            });
          }
        }
      );
    });
  }
  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const SELECT_BY_EMAIL = "SELECT * FROM 'USERS' WHERE EMAIL = ?";
      this.bd.all(SELECT_BY_EMAIL, email, (error, rows) => {
        if (error) {
          reject({
            message: error.message,
          });
        } else if (rows.length === 0) {
          reject({
            message: "The email require non exists",
          });
        } else {
          resolve({
            response: rows,
          });
        }
      });
    });
  }
  async deleteById(id) {
    try {
      const message = await this.findById(id);
      if (message.response.length) {
        const DELETED_message = `DELETE FROM MESSAGE
                              WHERE ID = ?`;
        return new Promise((resolve, reject) => {
          this.bd.run(DELETED_message, id, (error) => {
            if (error) {
              reject({
                message: error.message,
              });
            } else {
              resolve({
                response: "The message has been deleted",
              });
            }
          });
        });
      } else {
        throw new Error("The user require non exists");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = MessagesDao;
