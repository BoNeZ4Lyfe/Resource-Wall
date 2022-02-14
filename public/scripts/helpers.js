// checks user emails against target email and returns true or false
const userEmailLookup = (data, targetEmail) => {
  // iterates through database comparing values of email keys to target email
  for (const user of data) {
    if (user.email === targetEmail) {
      return user;
    }
  }
  return null;
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

//moved to the bottom
module.exports = {
  addUser,
  userEmailLookup,
};
