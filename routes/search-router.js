const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const search = req.query.search;
    const templateVars = {
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
    };

    res.render("search", templateVars);
  })

  return router;
}
