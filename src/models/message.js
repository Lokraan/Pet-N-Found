const Sequelize = require("sequelize");

const sequelize = require("../db");

const Message = sequelize.define("message", {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "uuid"
      }
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  }, {
    tableName: "messages",
    timestamps: true
  }
);

module.exports = Message;
