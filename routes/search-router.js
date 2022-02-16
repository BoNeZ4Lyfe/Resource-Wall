const express = require("express");
const { searchForResourceData } = require("../public/scripts/helpers");
const router = express.Router();

// ideally this will be moved to resource-router at some point today

module.exports = (db) => {
  router.get("/", (req, res) => {
    const search = req.query.search;
    const results = [];

    searchForResourceData(db, search)
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
      .catch(err => console.log("Search GET: ", err.message));

  });

  return router;
}
