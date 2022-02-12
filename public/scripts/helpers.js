// checks user emails against target email and returns true or false
const verifyUserLogin = (data, targetEmail, targetPassword) => {
  // iterates through database comparing values of email keys to target email
  for (const user of data) {
    if (user.email === targetEmail && user.password === targetPassword) {
      return true;
    }
  }
  return false;
};

module.exports = {
  verifyUserLogin
}
