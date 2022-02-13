const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.loggedIn = false;
    req.session.username = null;
    res.redirect("/");
  });
  return router;
};
