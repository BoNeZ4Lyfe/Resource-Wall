const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const search = req.query.search;
    const queryString = `
    SELECT title, url, description, created_at
    `


    const templateVars = {
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      query: search
    };

    res.render("search", templateVars);
  })

  return router;
}
