const User = require("../models/user");
const LostReport = require("../models/lostReport");

const { sequelize } = require("../db");

sequelize.sync({force: true})
  .then(() => {
    console.log("Succesful migration.");
  }).catch((err) => {
    console.log("Migrate error:", err);
  });
