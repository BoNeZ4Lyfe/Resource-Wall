const express = require("express");
const { render } = require("express/lib/response");
const router = express.Router();

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
        const templateVars = {
          resources: data.rows,
          loggedIn: req.session.loggedIn,
          userID: req.session.userID,
          username: req.session.username,
        };
        // res.json(data.rows); // Not API request anymore
        res.render("resources", templateVars); // <---- new edit
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// module.exports = (db) => {
//   router
//     .post("/", (req, res) => {
//       db.query(`
//     INSERT INTO resource_comments (comment)
//     VALUES ("comments");
//     `);
//     })
//     .then(() => {
//       console.log(res);
//     });
// };
