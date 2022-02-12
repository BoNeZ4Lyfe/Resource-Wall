const express = require("express");
const router = express.Router();

// GET /register
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  return router;
};
