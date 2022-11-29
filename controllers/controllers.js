const jwt = require("jsonwebtoken");

const getUserFromToken = async (req) => {
  const token = req.headers.authorization.split(" ")[1];

  //check if the token matches the supposed origin
  const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

  // retrieve the user details of the logged in user
  const user = decodedToken;

  return user;
};

module.exports = getUserFromToken;