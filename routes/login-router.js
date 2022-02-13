const express = require("express");
const router = express.Router();
const { verifyUserLogin } = require("../public/scripts/helpers");

module.exports = (db) => {
  // GET /login
  router.get("/", (req, res) => {
    res.render("login", { loggedIn: req.session.loggedIn, username: req.session.username });
  });

  router.post("/", (req, res) => {
    db.query(`
    SELECT *
    FROM users;
    `)
      .then(data => verifyUserLogin(data.rows, req.body.email, req.body.password))
      .then(user => {
        if (!user) {
          console.log("Error: User info not found in database");
          return res.status(403).send("Invalid login credentials, please check your name and password then try again");
        }
        req.session.loggedin = true;
        req.session.username = user.name;
        res.redirect("/login");
      });
  });
  return router;
};
