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

router.get("/foundReport", (req, res) => {
  res.render("foundReport", {title: "Pet n Found"})
})

router.get("/search", (req, res) => {
  res.render("search", {title: "Pet n Found"})
})
router.get("/reportToggle", (req, res) => {
  res.render("reportToggle", {title: "Pet n Found"})
})
module.exports = router
