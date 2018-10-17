const db = require("../db");
const express = require('express');
const router = express.Router();
const uuidv1 = require("uuid/v1");

router.get("/", (req, res) => {
  //const blogs = await db.getBlogPosts()
  res.render("index", {title: "Pet n Found"});
});

router.get("/map", (req, res) => {
  res.render("map/index", {title: "Pet n Found"});
});

router.get("/report", (req, res) => {
  if (req.session && req.session.userId) {
    db.findUserById(req.session.userId, (err, user) => {
      if(user)
        return res.render("report/index", {title: "Pet n Found"});
    });
  } else {
    return res.redirect("/login");
  }
});

router.get("/submit", (req, res) => {
  db.addReport(
    req.query.location, req.query.species, "Not an Image", req.query.name,
    req.query.description, req.query.email, req.query.phone
  );

  res.render("index", {title: "Pet n Found"});
});

router.get("/login", (req, res) => {
  res.render("login/index", {title: "Login - Pet n Found"});
});

router.post("/login/process", (req, res, next) => {
  const query = req.body;

  const username = query.username;
  const password = query.password;

  if (username && password) {
    db.findUserByUsernameAndPassword(username, password, (err, user) => {
      if (err)
        return next(err);

      console.log("user:", user);
      if (user) {
        req.session.userId = user.id;

        req.session.save((err) => {
          return res.redirect("/");
        });
      } else {
        return res.send("User not found");
      }
    });
  } else {
    const err = new Error("Fill out all fields");
    err.status = 400;

    return next(err);
  }
});

router.get("/register", (req, res) => {
  res.render("register/index", {title: "Register - Pet n Found"})
});

router.post("/register/process", (req, res, next) => {
  const query = req.body;

  const email = query.email;
  const username = query.username;
  const password = query.password;
  const confirmationPassword = query.passwordConfirmation;
  
  if (password !== confirmationPassword) {
    const err = new Error("Passwords do not match.");
    err.status = 400;

    return next(err);
  }

  if (email && username && password && confirmationPassword) {
    const uuid = uuidv1();
    db.addUser(email, username, password, uuid, (err, dbRes) => {
      if(err)
        return next(err);

      req.session.userId = uuid;
      req.session.save((err) => {
        return res.redirect("/");
      });
    });
  } else {
    const err = new Error("Fill out all fields");
    err.status = 400;

    return next(err);
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err)
        return next(err);
    });
  } else {
    return res.redirect("/");
  }
});

module.exports = router
