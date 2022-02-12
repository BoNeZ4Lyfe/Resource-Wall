const { query } = require("express");
const express = require("express");
const router = express.Router();

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
      .then(data => {
        console.log(data.rows);
      });
    return res.redirect("/");
  });
  return router;
};
