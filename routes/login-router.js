const express = require("express");
const { userEmailLookup } = require("../public/scripts/helpers");
const router = express.Router();


module.exports = (db) => {
  // GET /login
  router.get("/", (req, res) => {
    if (!req.session.loggedIn || !req.session.username) {
      res.render("login", { loggedIn: req.session.loggedIn, username: req.session.username });
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`
    SELECT *
    FROM users;
    `)
      .then(data => userEmailLookup(data.rows, email))
      .then(user => {
        if (!user) {
          console.log("Error: email not found in database");
          return res.status(403).send("There is no user registered to that email address.");
        }

        if (user.password === password) {
          req.session.loggedIn = true;
          req.session.username = user.name;
          res.redirect("/");
        } else {
          return res.status(403).send("Incorrect password.");
        }
      });
  });
  return router;
};
