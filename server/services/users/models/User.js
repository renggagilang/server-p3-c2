const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongoConect");
const { hashPassword } = require("../helpers/crypto");

class User {
  static async findAll() {
    const users = await getDb().collection("Userdb").find().toArray();
    return users;
  }

  static async findById(id) {
    const user = await getDb()
      .collection("Userdb")
      .findOne({
        _id: new ObjectId(id),
      });
    return user;
  }

  static async create(data) {
    const { username, email, password, phoneNumber, address } = data;
    const hashedPassword = hashPassword(password);
    const user = await getDb().collection("Userdb").insertOne({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return user;
  }

  static async deleteById(id) {
    const result = await getDb()
      .collection("Userdb")
      .deleteOne({
        _id: new ObjectId(id),
      });
    return result;
  }
}

module.exports = User;
