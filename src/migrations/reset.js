const User = require("../models/user");
const LostReport = require("../models/lostReport");

const { sequelize } = require("../db");

sequelize.[sync | drop]()
  .then(() => {
    console.log("Succesful reset.");
  }).catch((err) => {
    console.log("Error resetting:", err);
  });
