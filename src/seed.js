
/**
*
* Used to seed data for database and migrations.
*
**/

const db = require("./db")

const blogs = [
  {
    url: "first",
    title: "first",
    content: "first",
    description: "first post"
  },
  {
    url: "second",
    title: "second",
    content: "second",
    description: "second post second post second post second post second post second post"
  }
]

// const promises = blogs.map(
//   (blog) => db.addBlogPost(blog.url, blog.title, blog.content, blog.description))

// Promise.all(promises)
//   .then(() => console.log("Succesful seeding!"))
//   .catch(err => console.log(err.stack))
