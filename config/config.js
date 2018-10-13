
module.exports = {
  app: {
    port: 3000
  },
  db: {
    host: "localhost",
    username: "website",
    password: "website",
    database: "website_dev",
    schema: `CREATE TABLE IF NOT EXISTS blogs(
        url TEXT PRIMARY KEY,
        title TEXT,
        content TEXT,
        description TEXT,
        timestamp TEXT,
        views INTEGER
      )`,
    drop: "DROP TABLE IF EXISTS blogs"
  },
  graphiql: true
}
