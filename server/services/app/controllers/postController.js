const { Post, User, Category, Tags } = require("../models");
const { sequelize } = require("../models");
class postController {
  static async getPost(req, res, next) {
    try {
      let post = await Post.findAll({});
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async getPostById(req, res, next) {
    try {
      let post = await Post.findByPk(req.params.id, {
        include: [{ model: Tags }, { model: Category }],
      });

      if (!post) throw { name: "NotFound" };
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { title, content, imgUrl, CategoryId } = req.body;
      const post = await Post.create({
        title,
        content,
        imgUrl,
        CategoryId,
      });

      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  static async removePost(req, res, next) {
    try {
      let id = req.params.id;

      let deleteCount = await Post.destroy({
        where: { id },
      });
      if (deleteCount == 0) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ message: `Post ${id} deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async createPostTransaction(req, res, next) {
    let transaction;

    try {
      const { title, content, imgUrl, CategoryId, tags } = req.body;

      const t = await sequelize.transaction();
      const post = await Post.create(
        {
          title,
          content,
          imgUrl,
          CategoryId,
        },
        { transaction: t }
      );

      if (tags && typeof tags === "string") {
        const tag = await Tags.create(
          { name: tags, PostId: post.id },
          { transaction: t }
        );
      } else if (tags && Array.isArray(tags) && tags.length > 0) {
        const tagPromises = tags.map((tagName) =>
          Tags.create({ name: tagName, PostId: post.id }, { transaction: t })
        );
        await Promise.all(tagPromises);
      }

      await t.commit();

      res.status(201).json(post);
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      next(err);
    }
  }

  static async getAllTable(req, res, next) {
    try {
      let post = await Post.findAll({
        include: [Category, Tags],
      });
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = postController;
