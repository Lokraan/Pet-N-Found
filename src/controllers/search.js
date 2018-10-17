const db = require("../db")

const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  const { url } = req.params

  res.render("search/index")
})

module.exports = router
