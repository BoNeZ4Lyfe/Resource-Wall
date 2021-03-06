// queries database for user table and returns an array of user objects
const getUsers = (db) => {
  return db
    .query(
      `
    SELECT *
    FROM users;
    `
    )
    .then((users) => users.rows)
    .catch((err) => console.log("getUsers: ", err.message));
};

// checks user emails against target email and returns user object if email exists in database
const userEmailLookup = (users, targetEmail) => {
  for (const user of users) {
    if (user.email === targetEmail) {
      return user;
    }
  }
  return null;
};

// checks user name against target username and returns user object if username exists in database
const usernameLookup = (users, targetUsername) => {
  for (const user of users) {
    if (user.name === targetUsername) {
      return user;
    }
  }
  return null;
};

const updateUser = (db, property, id, update) => {
  return db
    .query(
      `
    UPDATE users
    SET ${property} = $1
    WHERE id = ${id};
    `,
      [update]
    )
    .catch((err) => console.log("updateUser: ", err.message));
};

const searchForResourceData = (db, search) => {
  const queryString = `
    SELECT url, title, topic, description, resources.created_at, resources.id, users.name as creator, coalesce(avg(ratings.rating), 0) as rating, (SELECT count(*) as likes FROM user_likes WHERE resource_id = resources.id), (SELECT count(*) as count FROM resource_comments WHERE resource_id = resources.id)
    FROM resources
    LEFT JOIN users ON user_id = users.id
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    WHERE title LIKE ('%' || $1 || '%') OR description LIKE ('%' || $1 || '%') OR topic LIKE ('%' || $1 || '%')
    GROUP BY resources.url, resources.title, resources.description, resources.topic, resources.created_at, resources.id, users.name
    ORDER BY rating DESC, likes DESC;`;

  const values = [search];

  return db
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((err) => console.log("SearchForResourceData: ", err.message));
};

const getLikedResources = (db, userID) => {
  const queryUserLikes = `
  SELECT url, title, topic, description, resources.created_at, resources.id, users.name as creator, coalesce(avg(ratings.rating), 0) as rating, (SELECT count(resource_comments.id) as comments FROM resource_comments WHERE resource_comments.resource_id = resources.id), (SELECT count(user_likes.id) as likes FROM user_likes WHERE user_likes.resource_id = resources.id)
  FROM resources
  LEFT JOIN users ON resources.user_id = users.id
  LEFT JOIN ratings ON ratings.resource_id = resources.id
  LEFT JOIN user_likes ON user_likes.resource_id = resources.id
  WHERE user_likes.user_id = ${userID}
  GROUP BY url, title, topic, description, resources.created_at, resources.id, users.name;`;

  return db
    .query(queryUserLikes)
    .then((res) => res.rows)
    .catch((err) => console.log("query likes: ", err.message));
};

const getUserResources = (db, userID) => {
const queryUserResources = `
  SELECT url, title, topic, description, resources.created_at, resources.id, users.name as creator, coalesce(avg(ratings.rating), 0) as rating, (SELECT count(resource_comments.id) as comments FROM resource_comments WHERE resource_comments.resource_id = resources.id), (SELECT count(user_likes.id) as likes FROM user_likes WHERE user_likes.resource_id = resources.id)
  FROM resources
  LEFT JOIN users ON resources.user_id = users.id
  LEFT JOIN ratings ON ratings.resource_id = resources.id
  WHERE resources.user_id = ${userID}
  GROUP BY url, title, topic, description, resources.created_at, resources.id, users.name;`;

  return db
    .query(queryUserResources)
    .then((res) => res.rows)
    .catch((err) => console.log("query resources: ", err.message));
};

const getSpecificResource = (db, resourceID) => {
  const queryString = `
    SELECT url, title, topic, description, created_at, users.name as creator, coalesce(avg(ratings.rating), 0) as rating, resources.id, resources.user_id, (SELECT count(*) as likes FROM user_likes WHERE resource_id = $1)
    FROM resources
    LEFT JOIN users ON user_id = users.id
    LEFT JOIN user_likes ON user_likes.resource_id = resources.id
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    WHERE resources.id = $1
    GROUP BY resources.url, resources.title, resources.description, resources.topic, resources.created_at, users.name, resources.id, users.id
    ORDER BY rating, likes;`;

  return db
    .query(queryString, [resourceID])
    .then((result) => {
      // console.log("id", resourceID);
      // console.log("result", result.rows);
      return result.rows[0];
    })
    .catch((err) => console.log("getSpecificResources: ", err.message));
};

const getComments = (db, resourceID) => {
  const queryString = `
    SELECT resource_comments.*, users.name as user_name
    FROM resource_comments
    JOIN users ON user_id = users.id
    WHERE resource_id = $1
    ORDER BY resource_comments.created_at;`;

  return db
    .query(queryString, [resourceID])
    .then((res) => res.rows)
    .catch((err) => console.log("getComments: ", err.message));
};

const likeResource = (db, resourceID, userID) => {
  const checkQueryString = `
    SELECT user_likes.id as like, resources.id as resource, users.id as user
    FROM user_likes
    JOIN resources ON resource_id = resources.id
    JOIN users ON user_likes.user_id = users.id
    WHERE user_likes.user_id = ${userID} AND resource_id = ${resourceID};`;

  const addLikeQueryString = `
    INSERT INTO user_likes (resource_id, user_id)
    VALUES (${resourceID}, ${userID})
    RETURNING *;`;

  const removeLikeQueryString = `
    DELETE FROM user_likes
    WHERE user_id = ${userID} AND resource_id = ${resourceID}
    RETURNING *;`;

  db.query(checkQueryString)
    .then((res) => res.rows[0])
    .then((res) => {
      if (res) {
        return db
          .query(removeLikeQueryString)
          .then((res) => console.log("remove like: ", res.rows[0]))
          .catch((err) => console.log("remove like: ", err));
      } else {
        return db
          .query(addLikeQueryString)
          .then((res) => console.log("add like: ", res.rows[0]))
          .catch((err) => console.log("add like: ", err.message));
      }
    })
    .catch((err) => console.log("check for like: ", err));
};

const rateResource = (db, resourceID, userID, rating) => {
  const checkQueryString = `
    SELECT ratings.id as rating, resources.id as resource, users.id as user
    FROM ratings
    JOIN resources ON resource_id = resources.id
    JOIN users ON ratings.user_id = users.id
    WHERE ratings.user_id = ${userID} AND resource_id = ${resourceID};`;

  const newRateQueryString = `
    INSERT INTO ratings (resource_id, user_id, rating)
    VALUES (${resourceID}, ${userID}, ${rating})
    RETURNING *;`;

  const changeRateQueryString = `
    UPDATE ratings
    SET rating = ${rating}
    WHERE user_id = ${userID}
    RETURNING *;`;

  db.query(checkQueryString)
    .then((res) => res.rows[0])
    .then((res) => {
      if (res) {
        return db
          .query(changeRateQueryString)
          .then((res) => console.log("change rating: ", res.rows[0]))
          .catch((err) => console.log("change rating: ", err.message));
      } else {
        return db
          .query(newRateQueryString)
          .then((res) => console.log("new rating: ", res.rows[0]))
          .catch((err) => console.log("new rating: ", err.message));
      }
    })
    .catch((err) => console.log("check for rating: ", err));
};

//Adds new user to the database
const addUser = function (user, db) {
  const values = [`${user.name}`, `${user.email}`, `${user.password}`];
  const queryStr = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;`;

  return db
    .query(queryStr, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log(err.message));
};

const createResource = function (resource, userID, db) {
  const values = [resource.topic, resource.url, resource.title, resource.description];
  const queryStr = `
  INSERT INTO resources (user_id, topic, url, title, description)
  VALUES (${userID}, $1, $2, $3, $4)
  RETURNING *;`;

  return db
    .query(queryStr, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log(err.message));
};

//moved to the bottom
module.exports = {
  addUser,
  getUsers,
  userEmailLookup,
  usernameLookup,
  updateUser,
  searchForResourceData,
  getLikedResources,
  getUserResources,
  getSpecificResource,
  getComments,
  likeResource,
  rateResource,
  createResource,
};
