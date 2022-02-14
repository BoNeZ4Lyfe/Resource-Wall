const express = require("express");
const { getUsers, userEmailLookup, usernameLookup, updateUser } = require("../public/scripts/helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.loggedIn) {
      const templateVars = {
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        username: req.session.username
      };
      res.render("user-settings", templateVars);
    } else {
      res.redirect("/");
    }
  });


  router.post("/username", (req, res) => {
    if (!req.body.username) {
      res.status(400).send("Please enter a new username");
    }

    const id = req.session.userID;
    const newUsername = req.body.username;

    getUsers(db)
      .then(users => usernameLookup(users, newUsername))
      .then(user => {
        if (user) {
          res.status(400).send("Username already in use");
        } else {
          updateUser(db, "name", id, newUsername);
          res.redirect("/user-settings");
        }
      })
      .catch(err => console.log(err.message));
  })

  return router;
};
