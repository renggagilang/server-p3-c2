"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
      Post.hasMany(models.Tags, {
        foreignKey: "PostId",
      });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title must be filled" },
          notEmpty: { msg: "Title cant be filled" },
        },
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Slug must be filled" },
          notEmpty: { msg: "Slug cant be filled" },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "content must be filled" },
          notEmpty: { msg: "content cant be filled" },
        },
      },
      imgUrl: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
      AuthorId: DataTypes.INTEGER,
      UserMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  Post.beforeValidate((post) => {
    if (post.title) {
      post.slug = post.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-");
    }
  });
  return Post;
};
