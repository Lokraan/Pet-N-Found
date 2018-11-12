const Sequelize = require("sequelize");

const sequelize = require("../db");
const LostReport = require("./lostReport");
const Chat = require("./message");

const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  }, {
    tableName: "users",
    timestamps: true
  }
);

User.hasMany(LostReport, {as: "lost_reports"});
User.hasMany(Chat, {as: "chats"});

module.exports = User;
