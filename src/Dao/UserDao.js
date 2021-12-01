class UserDao {
  constructor(bd) {
    this.bd = bd;
  }

  findAll() {
    const SELECT_ALL = "SELECT * FROM 'USERS'";
    return new Promise((resolve, reject) => {
      this.bd.all(SELECT_ALL, (error, rows) => {
        if (error) {
          reject({
            message: error.message,
            error: true,
          });
        } else {
          resolve({
            users: rows,
            count: rows.length,
            error: false,
          });
        }
      });
    });
  }
  insert(data) {
    return new Promise((resolve, reject) => {
      this.bd.run(
        `INSERT INTO USERS (NAME, EMAIL,PASSWORD) VALUES(?,?,?)`,
        [data.name, data.email, data.password],
        (error) => {
          if (error) {
            reject({
              message: error.message,
              error: true,
            });
          } else {
            resolve({
              email: data.email,
              error: false,
            });
          }
        }
      );
    });
  }
  findById(id) {
    return new Promise((resolve, reject) => {
      const SELECT_BY_ID = "SELECT * FROM 'USERS' WHERE ID = ?";
      this.bd.all(SELECT_BY_ID, id, (error, rows) => {
        if (error) {
          reject({
            message: error.message,
            error: true,
          });
        } else if (rows.length === 0) {
          reject({
            message: "The id require non exists",
            error: true,
          });
        } else {
          resolve({
            response: rows,
            error: false,
          });
        }
      });
    });
  }
  findByEmail(email) {
    return new Promise((resolve, reject) => {
      const SELECT_BY_EMAIL = "SELECT * FROM 'USERS' WHERE EMAIL = ?";
      this.bd.all(SELECT_BY_EMAIL, email, (error, rows) => {
        if (error) {
          reject({
            message: error.message,
            error: true,
          });
        } else if (rows.length === 0) {
          reject({
            message: "The email require non exists",
            error: true,
          });
        } else {
          resolve({
            users: rows,
            error: false,
          });
        }
      });
    });
  }
  async deleteById(id) {
    try {
      const user = await this.findById(id);
      if (user.response.length) {
        const DELETED_USER = `DELETE FROM USERS
                              WHERE ID = ?`;
        return new Promise((resolve, reject) => {
          this.bd.run(DELETED_USER, id, (error) => {
            if (error) {
              reject({
                message: error.message,
                error: true,
              });
            } else {
              resolve({
                response: "The user has been deleted",
                error: false,
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

module.exports = UserDao;
