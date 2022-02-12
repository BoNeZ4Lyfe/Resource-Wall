const { query } = require("express");
const express = require("express");
const router = express.Router();
const { verifyUserLogin } = require("../public/scripts/helpers");

// GET /login
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  router.post("/", (req, res) => {
    db.query(`
    SELECT email, password
    FROM users;
    `)
      .then(data => verifyUserLogin(data.rows, req.body.email, req.body.password))
      .then(emailFound => {
        !emailFound ? console.log('login data is not valid!') : console.log('login data is valid!');
      });
    return res.redirect("/");
  });
  return router;
};
