const express = require("express");
<<<<<<< HEAD
const { getSpecificResource, getComments, likeResource, rateResource } = require("../public/scripts/helpers");
=======
const {
  getSpecificResource,
  getComments,
  createResource,
} = require("../public/scripts/helpers");
>>>>>>> resource-post
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
        // console.log("DATA", data.rows);
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

      router.post("/", (req, res) => {
        const resource = req.body;
        console.log(resource);
        createResource(resource, db)
          .then((input) => {
            console.log('resources collected : ' ,input);

            res.redirect("/");
          })
          .catch((err) => err.message);
  });

  router.post("/comments", (req, res) => {
    // console.log("REQUEST", req.body);
    const { comment, resource_id } = req.body;
    const user_id = req.session.userID;

    let query = `
    insert into resource_comments (resource_id, user_id, comment) values ($1, $2, $3);
    `;
    const values = [resource_id, user_id, comment];

    db.query(query, values).then((res) => {
      console.log(res.body);
    });
  });

  router.get("/:id", (req, res) => {
    const templateVars = {
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      resource: null,
      comments: null,
    };

    getSpecificResource(db, req.params.id)
      .then((resource) => (templateVars.resource = resource))
      .then(() => getComments(db, req.params.id))
      .then((comments) => {
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
