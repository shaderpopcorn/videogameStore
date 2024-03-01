const { setError } = require("../config/error");
const { User } = require("../api/models/usersModel");
const { verifyToken } = require("../config/jwt");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(401, "You do not have permission!"));
    } else {
      const parsedToken = token.replace("Bearer ", ""); // removes the first part of the token string
      const tokenIsValid = verifyToken(parsedToken);
      const userLoggedIn = User.findById(tokenIsValid.id);
      userLoggedIn.password = null; // remove password from user data
      req.user = userLoggedIn;
      next();
    }
  } catch (err) {
    return next(setError(400, "Unable to verify authentication!"));
  }
};

module.exports = { isAuthenticated };
