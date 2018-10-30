const User = require("../models/user");
const LostReport = require("../models/lostReport");
const Message = require("../models/message");

const sequelize = require("../db");

sequelize.sync()
  .then(() => {
    console.log("Succesful migration.");
  }).catch((err) => {
    console.log("Migrate error:", err);
  });
