const express = require("express");
const { searchDatabase } = require("../public/scripts/helpers");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const search = req.query.search;
    const results = [];

    searchDatabase(db, search)
      .then(query => {
        for (const result of query) {
          results.push(result);
        }

        const templateVars = {
          result: results,
          loggedIn: req.session.loggedIn,
          userID: req.session.userID,
          username: req.session.username,
          query: search
        };

        res.render("search", templateVars);
      })
      .catch(err => console.log(err.message));

  });

  return router;
}
