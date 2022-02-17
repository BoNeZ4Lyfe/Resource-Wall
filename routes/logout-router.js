const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.session);
    req.session = null;
    res.redirect("/");
  });
  return router;
};
