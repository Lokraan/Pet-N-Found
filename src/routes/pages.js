const db = require("../db");
const express = require('express');
const router = express.Router();

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

router.post("/login/process", (req, res, next) => {
  const query = req.body;

  const username = query.username;
  const password = query.password;

  db.findUserByUsernameAndPassword(username, password, (err, res) => {
    if(err)
      return next(err);

    if(res !== null) {
      req.session.userID = "wow session id";
    }
  });
  
  res.redirect("/");
})

router.get("/register", (req, res) => {
  res.render("register", {title: "Register - Pet n Found"})
})

router.post("/register/process", (req, res, next) => {
  const query = req.body;

  const email = query.email;
  const username = query.username;
  const password = query.password;
  const confirmationPassword = query.passwordConfirmation;
  
  if(password !== confirmationPassword) {
    const err = new Error("Passwords do not match.");
    err.status = 400;

    res.send("Passwords dont match");
    return next(err);
  }

  console.log("query:", query);
  if(email && username && password && confirmationPassword) {
    db.addUser(email, username, password, (err, res) => {
      if(err)
        return next(err);
    });

    return res.render("index", {title: "Pet n Found"});
  }

  const err = new Error("All fields have to be filled out");
  err.status = 400;
  return next(err);
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err)
        return next(err);
    })
  }

  return res.redirect("/");
});

module.exports = router
