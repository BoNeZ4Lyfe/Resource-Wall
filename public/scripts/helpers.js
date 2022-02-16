// queries database for user table and returns an array of user objects
const getUsers = (db) => {
  return db
    .query(`
    SELECT *
    FROM users;
    `)
    .then(users => users.rows)
    .catch(err => console.log("getUsers: ", err.message));
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
    .query(`
    UPDATE users
    SET ${property} = $1
    WHERE id = ${id};
    `, [update])
    .catch(err => console.log("updateUser: ", err.message));
};

const searchForResourceData = (db, search) => {
  const queryString = `
    SELECT url, title, topic, description, created_at, users.name as creator, count(user_likes.*) as likes, avg(ratings.rating) as rating
    FROM resources
    JOIN users ON user_id = users.id
    JOIN user_likes ON user_likes.resource_id = resources.id
    JOIN ratings ON ratings.resource_id = resources.id
    WHERE title LIKE ('%' || $1 || '%') OR description LIKE ('%' || $1 || '%') OR topic LIKE ('%' || $1 || '%')
    GROUP BY resources.url, resources.title, resources.description, resources.topic, resources.created_at, users.name
    ORDER BY rating, likes;`

  const values = [search];

  return db
    .query(queryString, values)
    .then(result => result.rows)
    .catch(err => console.log("SearchForResourceData: ", err.message));
};

const selectMyResources = (db, userID) => {
  const queryString = `
    SELECT url, title, topic, description, created_at, users.name as creator, count(user_likes.*) as likes, avg(ratings.rating) as rating
    FROM resources
    JOIN users ON user_id = users.id
    JOIN user_likes ON user_likes.resource_id = resources.id
    JOIN ratings ON ratings.resource_id = resources.id
    WHERE users.id = ${userID} OR user_likes.user_id = ${userID}
    GROUP BY resources.url, resources.title, resources.description, resources.topic, resources.created_at, users.name
    ORDER BY rating, likes;`

  return db
    .query(queryString)
    .then(result => result.rows)
    .catch(err => console.log("selectMyResources: ", err.message));
};

const getSpecificResource = (db, resourceID) => {
  const queryString = `
    SELECT url, title, topic, description, created_at, users.name as creator, count(user_likes.*) as likes, avg(ratings.rating) as rating
    FROM resources
    JOIN users ON user_id = users.id
    JOIN user_likes ON user_likes.resource_id = resources.id
    JOIN ratings ON ratings.resource_id = resources.id
    WHERE resources.id = $1
    GROUP BY resources.url, resources.title, resources.description, resources.topic, resources.created_at, users.name
    ORDER BY rating, likes;`

  return db
    .query(queryString, [resourceID])
    .then(result => result.rows[0])
    .catch(err => console.log("getSpecificResources: ", err.message));
};

const getComments = (db, resourceID) => {
  const queryString = `
    SELECT resource_comments.*, users.name as user_name
    FROM resource_comments
    JOIN users ON user_id = users.id
    WHERE resource_id = $1;`

  return db
    .query(queryString, [resourceID])
    .then(res => res.rows)
    .catch(err => console.log("getComments: ", err.message));

};

//Adds new user to the database
const addUser = function(user, db) {
  const values = [`${user.name}`, `${user.email}`, `${user.password}`];
  const queryStr = `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;`;

  return db
    .query(queryStr, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log(err.message));
};

const createResource = function(resource, db) {
  const values = [`${resource.topic}`, `${resource.url}`, `${resource.title}`,`${resource.description}`, `${resource.user_id}`, `${resource.created_at}`];
  const queryStr = `INSERT INTO resources (topic, url, title, description)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

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
  selectMyResources,
  getSpecificResource,
  getComments,
  createResource
};
