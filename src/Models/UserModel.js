class UserModel {
  static validName(name) {
    const regex = /^([a-z]{2,}([\s-][a-z]{2,})+)$/gi;
    if (!regex.test(name)) {
      throw new Error("Invalid a format name: " + name);
    } else {
      return name;
    }
  }
  static validEmail(email) {
    const regex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

    if (!regex.test(email)) {
      throw new Error("Invalid a format email: " + email);
    } else {
      return email;
    }
  }
  static validPassword(password) {
    let regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

    if (!regex.test(password)) {
      throw new Error("Invalid a format password: " + password);
    } else {
      return password;
    }
  }
  constructor(body) {
    (this.name = UserModel.validName(body.name)),
      (this.email = UserModel.validEmail(body.email)),
      (this.password = UserModel.validPassword(body.password));
  }
}
module.exports = UserModel;
