const express = require("express");

module.exports = (app) => {
  const search = require("./search");
  const pages = require("./pages");
  const users = require("./users");

  app.use("/public", express.static("static"));
  app.use("/search", search);
  app.use("/user", users);
  app.use("/", pages);
}
