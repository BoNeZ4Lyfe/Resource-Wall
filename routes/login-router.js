const { query } = require("express");
const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../public/scripts/helpers");

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
      .then(data => getUserByEmail(data.rows, req.body.email))
      .then(emailFound => {
        !emailFound ? console.log('email is not valid!') : console.log('email is valid!');
      });
    return res.redirect("/");
  });
  return router;
};
