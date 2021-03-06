const express = require("express");
const { getUsers, userEmailLookup, usernameLookup, updateUser } = require("./helpers");
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
    const id = req.session.userID;
    const newUsername = req.body.username;

    getUsers(db)
      .then(users => usernameLookup(users, newUsername))
      .then(user => {
        if (user) {
          res.status(400).send("Username already in use");
        } else {
          updateUser(db, "name", id, newUsername);
          req.session.username = null;
          req.session.username = newUsername;
          res.redirect("/user-settings");
        }
      })
      .catch(err => console.log(err.message));
  });

  router.post("/email", (req, res) => {
    const id = req.session.userID;
    const newEmail = req.body.email;

    getUsers(db)
      .then(users => userEmailLookup(users, newEmail))
      .then(user => {
        if (user) {
          res.status(400).send("Email already in use");
        } else {
          updateUser(db, "email", id, newEmail);
          res.redirect("/user-settings");
        }
      })
      .catch(err => console.log(err.message));
  });

  router.post("/password", (req, res) => {
    const id = req.session.userID;
    const newPassword = req.body.password;

    updateUser(db, "password", id, newPassword);
    res.redirect("/user-settings");
  });

  return router;
};
