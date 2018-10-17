const express = require("express")

module.exports = (app) => {
  const search = require("./search")
  const pages = require("./pages")

  app.use("/public", express.static("static"))
  app.use("/search", search)
  app.use("/", pages)
}
