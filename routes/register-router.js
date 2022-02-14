const express = require("express");
const router = express.Router();

// GET /register
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register", { loggedIn: req.session.loggedIn, username: req.session.username });
  });
  return router;
};
