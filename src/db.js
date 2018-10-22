const Sequelize = require("sequelize");

const config = require("config").get("db");

module.exports = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  storage: config.storage
});
