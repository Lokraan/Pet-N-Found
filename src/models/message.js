const Sequelize = require("sequelize");
const crypto = require("crypto");

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
    receiver: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "uuid"
      }
    }, 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: "messages",
    timestamps: true,
    hooks: {
      beforeCreate: (msg, options) => {
        const id = crypto.createHash("sha256").
          update(msg.author).
          update(msg.receiver).
          update(msg.created_at).
          digest("base64");

        msg.id = id;
      }
    }
  }
);

module.exports = Message;
