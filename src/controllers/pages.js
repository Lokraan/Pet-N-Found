const express = require('express');
const bcrypt = require("bcrypt");

const User = require("../models/user");
const LostReport = require("../models/lostReport");
const { MapQuest }= require("../helpers/geolocation");
const upload = require("../helpers/fileStorage");

const router = express.Router();
const mapQuest = new MapQuest("PVNakNDJNXGyp5NZGmmcVz4DZsvMz2mO");

function returnUserFromSession(session, callback) {
  if(session && session.userId) {
    User.findOne({
      where: {
        uuid: session.userId
    }}).then((user) => {
      return callback(user);
    });
  } else {
    return callback(null);
  }
}

router.get("/", (req, res) => {
  res.render("index", {title: "Pet n Found"});
});

router.get("/map", (req, res) => {
  res.render("map/index", {title: "Pet n Found"});
});

router.get("/report", (req, res) => {
  returnUserFromSession(req.session, user => {
    if(user != null)
      return res.render("report/index", {title: "Pet n Found"});
    else 
      return res.redirect("/login");
  });
});

router.post("/report/submit", upload.single("image"), (req, res, next) => {
  const q = req.body;

  let fName = "report_default.png";
  if(req.file) fName = req.file.filename;

  returnUserFromSession(req.session, user => {
    if(user != null) {
      mapQuest.getLatitudeLongitudeFromAddress(q.location, (err, coords) => {
        LostReport.create({
          name: q.name,
          species: q.species,
          address: q.location,
          latitude: coords.lat,
          longitude: coords.lng,
          description: q.description,
          imageFileName: fName,
          userUuid: req.session.userId
        }).then(() => {
          return res.redirect("/");
        });
      })
    } else {
      return res.redirect("/login");
    }
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

        req.session.userId = user.uuid;

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
