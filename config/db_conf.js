const sql3 = require("sqlite3").verbose()
const config = require("./config")

const db =  new sql3.Database(config.db.name)

const schemas = [
  `CREATE TABLE IF NOT EXISTS lost_reports(
    address TEXT,
    lat DOUBLE,
    lon DOUBLE,
    species TEXT,
    image TEXT,
    name TEXT,
    description TEXT,
    email TEXT,
    phone TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS users(
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
]

db.serialize(function() {
  // db.run("DROP TABLE IF EXISTS lost_reports")
  // db.run(DROP TALBE IF EXISTS users)
  for (var i = schemas.length - 1; i >= 0; i--) {
    db.run(schemas[i])
  }
})

module.exports = {
  db: db
}
