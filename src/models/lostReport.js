const Sequelize = require("sequelize");

const sequelize = require("../db");

const LostReport = sequelize.define("lost_report", {
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  }, {
    tableName: "lost_reports",
    timestamps: true
  }
);

module.exports = LostReport;
