const express = require('express');

const User = require("../models/user");
const LostReport = require("../models/lostReport");

const router = express.Router();

router.get("/:username", (req, res) => {
  User.findOne({
    where: {username: req.params.username},
    include: [{
      model: LostReport,
      as: "lost_reports"
    }]
  }).then(user => {
    if (user != null) {
      const userSend = {
        username: user.username,
        lostReports: user.lost_reports
      }
      res.render("user/index", {user: userSend, title: "Pet n Found"});
    } else
      res.send("404 not found");
  });
});

module.exports = router;
