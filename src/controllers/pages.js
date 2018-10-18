const express = require('express');
const bcrypt = require("bcrypt");

const User = require("../models/user");
const LostReport = require("../models/lostReport");
const { MapQuest }= require("../helpers/geolocation");

const router = express.Router();
const mapQuest = new MapQuest("PVNakNDJNXGyp5NZGmmcVz4DZsvMz2mO");

router.get("/", (req, res) => {
  res.render("index", {title: "Pet n Found"});
});

router.get("/map", (req, res) => {
  res.render("map/index", {title: "Pet n Found"});
});

router.get("/report", (req, res) => {
  if (req.session && req.session.userId) {
    User.findOne({
      where: {
        uuid: req.session.userId
    }}).then((user) => {
      if(user.uuid == req.session.userId) 
        return res.render("report/index", {title: "Pet n Found"});
      else
        return res.redirect("/login");
    })
  } else {
    return res.redirect("/login");
  }
});

router.get("/submit", (req, res, next) => {
  const q = req.query;

  mapQuest.getLatitudeLongitudeFromAddress(q.location, (err, coords) => {
    LostReport.create({
      name: q.name,
      species: q.species,
      address: q.location,
      latitude: coords.lat,
      longitude: coords.lng,
      description: q.description
    }).then(() => {
      return res.redirect("/");
    });
  });
});

router.get("/login", (req, res) => {
  res.render("login/index", {title: "Login - Pet n Found"});
});

router.post("/login/process", (req, res, next) => {
  const query = req.body;

  const username = query.username;
  const password = query.password;

  if (username && password) {
    User.findOne({
      where: {
        username: username
      }
    }).then((user) => {
      if(!user)
        return next("Username not found");

      bcrypt.compare(password, user.password, (err, isEqual) => {
        if(err)
          return next("Incorrect Password");

        req.session.userId = user.id;

        req.session.save((err) => {
          return res.redirect("/");
        }); 
      });
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
    bcrypt.hash(password, 10, (err, hash) => {
      if(err)
        throw err;

      User.create({
        email: email,
        username: username,
        password: hash
      }).then((user) => {
        req.session.userId = user.uuid;

        req.session.save((err) => {
          return res.redirect("/");
        })
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
