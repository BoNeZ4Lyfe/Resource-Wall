const express = require("express");
const { addUser } = require("./helpers");
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
    addUser(user, db)
      .then(user => {
        req.session.loggedIn = true;
        req.session.userID = user.id;
        req.session.username = user.name;
        res.redirect("/");
      })
      .catch(err => err.message);
  });
  return router;
};
