const { Category } = require("../models");

class categoryController {
  static async getCategory(req, res, next) {
    try {
      let post = await Category.findAll({});
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async removeCategory(req, res, next) {
    try {
      let id = req.params.id;
      let deleteCount = await Category.destroy({
        where: { id },
      });
      if (deleteCount == 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ message: `Category ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const post = await Category.create({ name });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = categoryController;
