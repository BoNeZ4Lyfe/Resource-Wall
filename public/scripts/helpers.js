// queries database for user table and returns an array of user objects
const getUsers = (db) => {
  return db
    .query(`
    SELECT *
    FROM users;
    `)
    .then(users => users.rows)
    .catch(err => console.log(err.message));
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
    .catch(err => console.log(err.message));
};

const searchDatabase = (db, search) => {
  const queryString = `
  SELECT url, title, description, created_at, users.name as creator, count(user_likes.*) as likes, avg(ratings.rating) as rating
  FROM resources
  JOIN users ON user_id = users.id
  JOIN user_likes ON user_likes.resource_id = resources.id
  JOIN ratings ON ratings.resource_id = resources.id
  WHERE title LIKE ('%' || $1 || '%') OR description LIKE ('%' || $1 || '%')
  GROUP BY resources.url, resources.title, resources.description, resources.created_at, users.name
  ORDER BY rating, likes;
  `

  const values = [search];

  return db
    .query(queryString, values)
    .then(result => result.rows)
    .catch(err => console.log(err.message));
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

//moved to the bottom
module.exports = {
  addUser,
  getUsers,
  userEmailLookup,
  usernameLookup,
  updateUser,
  searchDatabase
};
