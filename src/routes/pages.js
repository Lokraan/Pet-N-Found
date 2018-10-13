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
   console.log("POST!")
   console.log(req.location)

  db.addReport(
    req.query.location, req.query.species, "Nnot and Image", req.query.name,
    "I have no description", req.query.email, req.query.phone
  )

  res.render("index", {title: "Pet n Found"})
})

module.exports = router
