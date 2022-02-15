const express = require("express");
const { searchDatabase } = require("../public/scripts/helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const search = req.query.search;
    const results = [];

    searchDatabase(db, search)
      .then(res => {
        for (const result of res) {
          results.push(result);
        }
      })
      .catch(err => console.log(err.message));

    const templateVars = {
      results: results,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      query: search
    };
    res.render("search", templateVars);
  });

  return router;
}
