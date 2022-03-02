class UserDao {
  constructor(bd) {
    this.mysql = bd;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query("SELECT * FROM users;", (error, result, fields) => {
          if (error) {
            return reject({ error: error });
          }
          return resolve({
            response: result,
            count: result.length,
          });
        });
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
          "INSERT INTO users (_id, name, email, password) VALUES (?,?,?,?)",
          [data.ID, data.NAME, data.EMAIL, data.PASSWORD],
          (error, result, field) => {
            conn.release();
            if (error) {
              return reject({
                error: error,
                response: null,
              });
            }
            resolve({
              id: data.ID,
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
          "SELECT name, email, thumbnail FROM users WHERE _id = ?",
          id,
          (error, result, fields) => {
            if (error || result.length === 0) {
              return reject({ message: "The id require non exists" });
            }
            return resolve({
              response: result,
            });
          }
        );
      });
    });
  }

  findByIdFullRows(id) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT * FROM users WHERE _id = ?",
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

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT name, email FROM users WHERE email = ?",
          email,
          (error, result, fields) => {
            if (error || result.length === 0) {
              return reject({ message: "The email require non exists" });
            }
            return resolve({
              response: result,
            });
          }
        );
      });
    });
  }

  findByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "SELECT _id FROM users WHERE email = ? AND password = ?",
          [email, password],
          (error, result, fields) => {
            if (error || result.length === 0) {
              return reject({ error: "Error logging in" });
            }
            return resolve({
              response: result[0],
            });
          }
        );
      });
    });
  }

  updateByID(id, data) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          `UPDATE users SET name = ?, email = ?, password =?,
          thumbnail = ?, bio = ? WHERE _id = ?`,
          [data.name, data.email, data.password, data.thumbnail, data.bio, id],
          (error, result, fields) => {
            if (error) {
              return reject({ message: error });
            }
            return resolve({
              response: result,
            });
          }
        );
      });
    });
  }

  addProfileImg(id, imgBin) {
    return new Promise((resolve, reject) => {
      this.mysql.getConnection((error, conn) => {
        if (error) {
          return reject({ error: error });
        }
        conn.query(
          "UPDATE users SET thumbnail = ? WHERE _id = ?",
          [imgBin, id],
          (error, result, fields) => {
            if (error) {
              return reject({ message: error });
            }
            return resolve({
              response: "Image loaded successfully",
            });
          }
        );
      });
    });
  }

  async deleteById(id) {
    try {
      const user = await this.findById(id);

      if (!user.error) {
        return new Promise((resolve, reject) => {
          this.mysql.getConnection((error, conn) => {
            if (error) {
              return reject({ message: "Invalid ID" });
            }
            conn.query(
              "DELETE FROM users WHERE _id = ?",
              id,
              (error, result, fields) => {
                if (error) {
                  return reject({ message: error });
                }
                return resolve({
                  response: "User deleted successfully",
                });
              }
            );
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
