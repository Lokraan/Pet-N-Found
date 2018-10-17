const express = require("express")

module.exports = (app) => {
  app.set("views", "../views")
  app.set("view engine", "pug")

  const search = require("./search")
  const pages = require("./pages")

  app.use("/static", express.static("static"))
  app.use("/search", search)
  app.use("/", pages)
}
