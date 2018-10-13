
const sql3 = require("sqlite3").verbose()
const config = require("./config")

const db =  new sql3.Database(config.db.name)

const schemas = [
  `CREATE TABLE IF NOT EXISTS not_table(
    info TEXT
  )`,
]

db.serialize(function() {
  for (var i = schemas.length - 1; i >= 0; i--) {
    db.run(schemas[i])
  }
})

module.exports = {
  db: db
}
