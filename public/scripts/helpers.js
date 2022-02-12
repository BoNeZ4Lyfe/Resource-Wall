// checks user emails against target email and returns true or false
const getUserByEmail = (data, targetEmail) => {

  // iterates through database comparing values of email keys to target email
  for (const user in data) {
    console.log(user);
    if (user.email === targetEmail) {
      return true;
    }
  }
  // return false;
};

module.exports = {
  getUserByEmail
}
