const express = require("express");
const router = express.Router();

// GET / resources
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users LIMIT 5;`)
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
