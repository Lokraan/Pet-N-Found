const User = require("../models/user");
const LostReport = require("../models/lostReport");
const Message = require("../models/message");
const Chat = require("../models/chat");

const sequelize = require("../db");

sequelize.sync({force: true})
  .then(() => {
    console.log("Succesful reset.");
  })
  .catch((err) => {
    console.log("Migration error:", err);
  });
