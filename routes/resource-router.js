const express = require("express");
const { render } = require("express/lib/response");
const router = express.Router();

// GET / resources
// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(
//       `
//     SELECT * FROM resources
//     JOIN users ON user_id = users.id
//     LIMIT 5;
//     ;`
//     )
//       .then((data) => {
//         res.json(data.rows);
//         // res.render("resources");
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });
//   return router;
// };

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = 1; // TODO: add session/cookie for logged in user later
    db.query(
      `
    SELECT * FROM resources
    JOIN users ON user_id = $1
    ;`,
      [userId]
    )
      .then((data) => {
        const user = {
          loggedIn: req.session.loggedIn,
          username: req.session.username,
        };
        // res.json(data.rows); // Not API request anymore
        res.render("resources", { resources: data.rows, ...user }); // <---- new edit
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
