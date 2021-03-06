const express = require("express");
const { userEmailLookup, getUsers } = require("./helpers");
const router = express.Router();

// GET /login
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.session.loggedIn) {
      const templateVars = {
        loggedIn: req.session.loggedIn,
        userID: req.session.userID,
        username: req.session.username
      };
      res.render("login", templateVars);
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    getUsers(db)
      .then(data => userEmailLookup(data, email))
      .then(user => {
        if (!user) {
          res.status(403).send("There is no user registered to that email address.");
        } else {
          if (user.password === password) {
            req.session.loggedIn = true;
            req.session.userID = user.id;
            req.session.username = user.name;
            res.redirect("/resources");
          } else {
            res.status(403).send("Incorrect password.");
          }
        }
      })
      .catch(err => console.log(err.message));
  });
  return router;
};
