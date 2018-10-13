
module.exports = {
  app: {
    port: 3000
  },
  db: {
    name: "website",
    schema: `CREATE TABLE IF NOT EXISTS dabs(
        url TEXT PRIMARY KEY,
        title TEXT,
        content TEXT,
        description TEXT,
        timestamp TEXT,
        views INTEGER
      )`,
    drop: "DROP TABLE IF EXISTS blogs"
  }
}
