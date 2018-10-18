/**
*
* Used to seed data for database and migrations.
*
**/

const db = require("../db")

const reports = [
  {
    address: "Round Rock, TX",
    species: "dog",
    image: "first",
    name: "cata cat",
    description: "cata cat loves cats",
    email: "catlover@gmail.com",
    phone: "512-569-4280"
  },
  {
    address: "Austin",
    species: "dog",
    image: "first",
    name: "cata cat",
    description: "Dog cata cat loves cats",
    email: "doglover@gmail.com",
    phone: "512-569-4281"
  },
  {
    address: "Pflugerville, Texas",
    species: "dog",
    image: "first",
    name: "cata cat",
    description: "Dog cata cat loves cats",
    email: "doglover@gmail.com",
    phone: "512-569-4281"
  }
]

// const promises = blogs.map(
//   (blog) => db.addBlogPost(blog.url, blog.title, blog.content, blog.description))

reports.forEach((report) => {
  db.addReport(
    report.address, report.species, report.image, report.name,
    report.description, report.email, report.phone
  )
})

const res = db.getLostReports((data) => {
  console.log(data)
})

// Promise.all(promises)
//   .then(() => console.log("Succesful seeding!"))
//   .catch(err => console.log(err.stack))
