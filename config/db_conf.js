
const { Pool, Client } = require("pg")
const config = require("./config")

const pg_conf = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password
}

module.exports = {
  pool: new Pool(pg_conf),
  client: new Client(pg_conf)
}
