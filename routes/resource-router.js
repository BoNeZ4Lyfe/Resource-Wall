const express = require("express");
const { getSpecificResource } = require("../public/scripts/helpers");
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
        const templateVars = {
          resources: data.rows,
          loggedIn: req.session.loggedIn,
          userID: req.session.userID,
          username: req.session.username
        };
        // res.json(data.rows); // Not API request anymore
        res.render("resources", templateVars); // <---- new edit
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {

    getSpecificResource(db, req.params.id)
      .then(resource => {
        const templateVars = {
          loggedIn: req.session.loggedIn,
          userID: req.session.userID,
          username: req.session.username,
          resource: resource
        };
        res.render("resources_id", templateVars);
      })
      .catch(err => console.log(`GET resources/${req.params.id}: `, err.message));


  })

  return router;
};
