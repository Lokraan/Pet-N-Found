const db = require("../db")

const express = require('express')
const router = express.Router()

router.get("/:url", (req, res) => {
  const { url } = req.params

  res.send("DOpe URL")
})

module.exports = router
