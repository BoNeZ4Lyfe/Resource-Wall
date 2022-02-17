const express = require("express");
const router = express.Router();
const {
  getSpecificResource,
  getComments,
  likeResource,
  rateResource,
  createResource,
  selectMyResources,
} = require("../public/scripts/helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session.userID;
    const myResources = [];

    selectMyResources(db, userID)
      .then((resources) => {
        for (const resource of resources) {
          myResources.push(resource);
        }

        const templateVars = {
          resources: myResources,
          loggedIn: req.session.loggedIn,
          userID: req.session.userID,
          username: req.session.username,
        };

        res.render("resources", templateVars);
      })
      .catch((err) => console.log("Resources GET: ", err.message));
  });

  router.post("/", (req, res) => {
    const resource = req.body;
    const userID = req.session.userID;
    console.log(userID);
    console.log(resource);
    createResource(resource, userID, db)
      .then((input) => {
        console.log("resources collected: ", input);
        res.redirect("/");
      })
      .catch((err) => err.message);
  });

  router.post("/comments", (req, res) => {
    const { comment, resource_id } = req.body;
    console.log(req.body)
    const user_id = req.session.userID;
    console.log(user_id, resource_id, comment);

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

    let query = `
    INSERT INTO resources (user_id, topic, url, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [user_id, topic, url, title, description];

    db.query(query, values)
      .then(() => {
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
    const userID = req.session.userID;
    const rating = req.body.rating;

    if (rating) {
      rateResource(db, resourceID, userID, rating);
    } else {
      likeResource(db, resourceID, userID);
    }
    res.json({ result: "Post complete 🥳" });
  });

  return router;
};
