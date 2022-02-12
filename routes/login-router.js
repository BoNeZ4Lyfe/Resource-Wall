const express = require("express");
const router = express.Router();

// GET /login
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });
  return router;
};
