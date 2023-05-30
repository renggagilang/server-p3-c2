"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tags.belongsTo(models.Post, {
        foreignKey: "PostId",
      });
    }
  }
  Tags.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Tags must be filled" },
          notEmpty: { msg: "Tags cant be filled" },
        },
      },
      PostId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tags",
    }
  );
  return Tags;
};
