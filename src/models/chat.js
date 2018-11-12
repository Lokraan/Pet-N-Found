const Sequelize = require("sequelize");

const sequelize = require("../db");
const Message = require("./message");
const User = require("./user");

const Chat = sequelize.define("chat", {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
});

Chat.hasMany(Message, {as: "messages"});
Chat.hasMany(User, {as: "users"});

module.exports = Chat;
