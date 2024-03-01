const { setError } = require("./error");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
  } catch (err) {
    setError(401, "Invalid or expired token!");
  }
};

module.exports = { generateToken, verifyToken };
