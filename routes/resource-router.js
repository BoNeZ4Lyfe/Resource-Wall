const express = require("express");
const { getSpecificResource, getComments, likeResource, rateResource } = require("../public/scripts/helpers");
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

  router.get("/:id", (req, res) => {
    const templateVars = {
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      resource: null,
      comments: null
    };

    getSpecificResource(db, req.params.id)
      .then(resource => templateVars.resource = resource)
      .then(() => getComments(db, req.params.id))
      .then(comments => {
        templateVars.comments = comments;
        res.render("resources_id", templateVars);
      })
      .catch(err => console.log(`GET resources/${req.params.id}: `, err.message));
  });

  router.post("/:id", (req, res) => {
    const resourceID = req.body.resource;
    const userID = req.body.user;

    if (req.body.rating) {
      rateResource(db, resourceID, userID, req.body.rating)
        .then(res => console.log("Resource rated: ", res))
        .catch(err => console.log("rateResource: ", err.message));
    } else {
      likeResource(db, resourceID, userID)
        .then(res => console.log("Resource liked: ", res))
        .catch(err => console.log("likeResource: ", err.message));
    }

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
