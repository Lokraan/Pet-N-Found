
const db = require("../db")
const Router = require('express-promise-router')

const router = new Router()

router.get("/", async(req, res) => {
  //const blogs = await db.getBlogPosts()
  res.render("index", {title: "Pet n Found"})
})

router.get("/map", async(req, res) => {
  res.render("map", {title: "Pet n Found"})
})

module.exports = router
