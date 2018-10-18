const Sequelize = require("sequelize");

const sequelize = require("../db");
const LostReport = require("./lostReport");

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

console.log(User);
User.hasMany(LostReport, {as: "lost_reports"});

module.exports = User;
