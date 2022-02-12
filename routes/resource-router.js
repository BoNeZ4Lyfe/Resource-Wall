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

// <%= JSON.stringify(locals.resources) %>

// insert into resources (user_id, topic_id, url, title, description, created_at) values (6, 3, 'http://istockphoto.com', 'vestibulum aliquet ultrices', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', '2018-08-21 04:43:29');
