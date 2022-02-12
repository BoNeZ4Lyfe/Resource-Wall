const express = require("express");
const router = express.Router();

// GET / users
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users LIMIT 5;`)
      .then((users) => {
        res.render(users.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
