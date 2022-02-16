const express = require("express");
const { getSpecificResource, getComments, likeResource, rateResource, createResource } = require("../public/scripts/helpers");
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
    const userID = req.session.userID;
    console.log(userID);
    console.log(resource);
    createResource(resource, userID, db)
      .then((input) => {
        console.log('resources collected: ', input);
        res.redirect("/");
      })
      .catch((err) => err.message);
  });

  router.post("/comments", (req, res) => {

    const { comment, resource_id } = req.body;
    const user_id = req.session.userId;

    let query = `
    INSERT INTO resource_comments (resource_id, user_id, comment) VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [resource_id, user_id, comment];

    db.query(query, values)
      .then((result) => {
        console.log("🔴", result.rows[0]);
        res.send("OK");
      })
      .catch((err) => console.log("Can not post the comment: ", err.message));
  });

  router.post("/new", (req, res) => {
    const { title, url, description, topic } = req.body;
    const user_id = req.session.userId;
    console.log("TITLE:", title);
    console.log("URL:", url);
    console.log("Description:", description);
    console.log("Topic:", topic);

    let query = `
    INSERT INTO resources (user_id, topic, url, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [user_id, topic, url, title, description];

    db.query(query, values)
      .then((result) => {
        console.log("🔴", result.rows[0]);
        res.send("OK");
      })
      .catch((err) =>
        console.log("Can not post the created resource: ", err.message)
      );
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
      .catch((err) =>
        console.log(`GET resources/${req.params.id}: `, err.message)
      );
  });

  router.post("/:id", (req, res) => {
    const resourceID = req.body.resource;
    const userID = req.body.user;
    const rating = req.body.rating;

<<<<<<< HEAD
    if (req.body.rating) {
      rateResource(db, resourceID, userID, req.body.rating)
        .then((res) => console.log("Resource rated: ", res))
        .catch((err) => console.log("rateResource: ", err.message));
    } else {
      likeResource(db, resourceID, userID)
        .then((res) => console.log("Resource liked: ", res))
        .catch((err) => console.log("likeResource: ", err.message));
=======
    if (rating) {
      rateResource(db, resourceID, rating)
        .then(res => console.log("Rating posted: ", res))
        .catch(err => console.log("rateResource: ", err.message));
    } else {
      likeResource(db, resourceID, userID)
        .then(res => console.log("Like posted: ", res))
        .catch(err => console.log("likeResource: ", err.message));
>>>>>>> master
    }
  });

  return router;
};
