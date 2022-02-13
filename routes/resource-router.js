const express = require("express");
const router = express.Router();

// GET / resources
module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = 1; // TODO: add session/cookie for logged in user later
    db.query(
      `
    SELECT * FROM resources
    JOIN users ON user_id = $1
    LIMIT 5;
    ;`,
      [userId]
    )
      .then((data) => {
        // res.json(data.rows); // Not API request anymore
        res.render("resources", { resources: data.rows }); // <---- new edit
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
