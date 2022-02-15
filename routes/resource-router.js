const express = require("express");
const { render } = require("express/lib/response");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT resources.*, users.*, COUNT(resource_comments.id) AS count
      FROM resources
      JOIN users ON user_id = users.id
      JOIN resource_comments ON resources.id = resource_id
      GROUP BY resources.id, users.id
    ;`
    )
      .then((data) => {
        console.log("DATA", data.rows);
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

  router.post("/comments", (req, res) => {
    console.log("REQUEST", req.body);
    const { comment, resource_id } = req.body;
    const user_id = req.session.userID;

    let query = `
    insert into resource_comments (resource_id, user_id, comment) values ($1, $2, $3);
    `;
    const values = [resource_id, user_id, comment];

    db.query(query, values).then((res) => {
      //redirect to the user page with individual resource
    });
  });

  return router;
};
