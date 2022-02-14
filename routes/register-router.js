const express = require("express");
const { addUser } = require("../public/scripts/helpers");
const router = express.Router();

// GET /register
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.session.loggedIn) {
      const templateVars = {
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        username: req.session.username
      };
      res.render("register", templateVars);
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    const user = req.body;
    const password = req.body.password;

    if (user.password === password) {
      addUser(user, db);
      req.session.loggedIn = true;
      req.session.userID = user.id;
      req.session.username = user.name;
      res.redirect("/");
    } else {
      return res.status(403).send("Incorrect password.");
    }
  });
  return router;
};
