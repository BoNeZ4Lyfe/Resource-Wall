const express = require("express");
const { addUser } = require("../public/scripts/helpers");
const router = express.Router();

// GET /register
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register", {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  });

  router.post("/", (req, res) => {
    const user = req.body;
    const password = req.body.password;

    if (user.password === password) {
      addUser(user, db);
      req.session.loggedIn = true;
      req.session.username = user.name;
      res.redirect("/");
    } else {
      return res.status(403).send("Incorrect password.");
    }
  });
  return router;
};
