// checks user emails against target email and returns true or false
const getUserByEmail = (data, targetEmail) => {
  // iterates through database comparing values of email keys to target email

  for (const user of data) {
    if (user.email === targetEmail) {
      return true;
    }
  }
  return false;
};

module.exports = {
  getUserByEmail
}
