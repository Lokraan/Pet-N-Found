
const { db } = require("../config/db_conf")
const { to } = require("await-to-js")

module.exports = {
  helloWorld() {
    console.log("Hello World")
  }
  // getBlogPosts(limit) {
  //   const query = {
  //     text: `SELECT * FROM blogs ORDER BY timestamp DESC LIMIT $1`,
  //     values: [limit]
  //   }

  //   const [err, res] = await to(pool.query(query))
  //   if(err) throw new Error("Failed to get blog posts.")

  //   return res.rows
  // },

  // async getBlogPost() {
  //   const query = {
  //     text: "SELECT * FROM blogs WHERE id = $1",
  //     values: [id]
  //   }

  //   const [err, res] = await to(pool.query(query))
  //   if(err) throw new Error("Failed to get blog post.")


  //   return res.rows[0] || null;
  // },

  // async addBlogPost(url, title, content, description) {
  //   const timestamp = Math.floor((new Date()).getTime() / 1000)
  //   const views = 0
  //   const query = {
  //     text: "INSERT INTO blogs VALUES($1, $2, $3, $4, $5, $6)",
  //     values: [url, title, content, description, timestamp, views] 
  //   }

  //   const [err, res] = await to(pool.query(query))
  //   if(err) throw new Error("Failed to add blog post.")

  // },

  // async getBlogUrls() {
  //   const query = {
  //     text: "SELECT url FROM blogs",
  //     rowMode: "array"
  //   }

  //   const [err, res] = await to(pool.query(query))
  //   if(err) throw new Error("Failed to add blog post.")

  //   return [].concat.apply([], res.rows)
  // },

  // async getBlogByUrl(url) { 
  //   const query = {
  //     text: "SELECT * FROM blogs WHERE url = $1",
  //     values: [url]
  //   }

  //   const [err, res] = await to(pool.query(query))
  //   if(err) throw new Error("Failed to add blog post.")

  //   return res.rows[0] || null
  // }
}
