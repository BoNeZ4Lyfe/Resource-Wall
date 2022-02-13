// const { query } = require("express");
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
    SELECT name, email, password
    FROM users;
    `)
      .then(data => verifyUserLogin(data.rows, req.body.email, req.body.password))
      .then(user => {
        if (!user) {
          console.log("Error: User info not found in database");
          return res.status(403).send("Invalid login credentials, please check your name and password then try again");
        }
        req.session["user_id"] = user.email;
        res.redirect("/");
      });
  });
  return router;
};
