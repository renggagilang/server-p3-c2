const User = require("../models/User");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: `user has been created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let { id } = req.params;
      let deleteResult = await User.deleteById(id);
      if (deleteResult.deletedCount === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ message: `User with id: ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
