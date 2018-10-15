const db = require("../db")
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  //const blogs = await db.getBlogPosts()
  res.render("index", {title: "Pet n Found"})
})

router.get("/map", (req, res) => {
  res.render("map", {title: "Pet n Found"})
})

router.get("/report", (req, res) => {
  res.render("report", {title: "Pet n Found"})
})

router.get("/submit", (req, res) => {
  db.addReport(
    req.query.location, req.query.species, "Not an Image", req.query.name,
    req.query.description, req.query.email, req.query.phone
  )

  res.render("index", {title: "Pet n Found"})
})

router.get("/login", (req, res) => {
  res.render("login", {title: "Login - Pet n Found"})
})

router.get("/register", (req, res) => {
  res.render("register", {title: "Register - Pet n Found"})
})
module.exports = router
