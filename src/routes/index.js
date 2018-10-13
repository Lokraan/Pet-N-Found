
const express = require("express")

module.exports = (app) => {
  app.set("views", "../views")
  app.set("view engine", "pug")

  const blogs = require("./blogs")
  const pages = require("./pages")

  app.use("/static", express.static("static"))
  app.use("/blog", blogs)
  app.use("/", pages)
}
