const { setError } = require("./error");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, SALTROUNDS);
  return hash;
};

const verifyPassword = async (password, hash) => {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (err) {
    setError(401, "Could not verify password!");
  }
};

module.exports = { hashPassword, verifyPassword };
