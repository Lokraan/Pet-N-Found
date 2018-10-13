const sql3 = require("sqlite3").verbose()
const config = require("./config")

const db =  new sql3.Database(config.db.name)

const schemas = [
  `CREATE TABLE lost_reports(
    address TEXT,
    species TEXT,
    image TEXT,
    name TEXT,
    description TEXT,
    email TEXT,
    phone TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
]

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS lost_reports")
  for (var i = schemas.length - 1; i >= 0; i--) {
    db.run(schemas[i])
  }
})

module.exports = {
  db: db
}
