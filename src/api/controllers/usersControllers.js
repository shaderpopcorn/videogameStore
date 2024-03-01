const { setError } = require("../../config/error");
const { User } = require("../models/usersModel");
const { hashPassword, verifyPassword } = require("../../config/password");
const { generateToken } = require("../../config/jwt");

const registerUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const hash = await hashPassword(password);

    const newUser = new User({ userName: userName, password: hash });

    const userExists = await User.findOne({ userName });
    if (userExists) {
      return next(setError(400, "this User already exists!"));
    } else {
      const user = await newUser.save();
      return res.status(201).json(user);
    }
  } catch (err) {
    return next(setError(400, "Cant register User!"));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).lean();

    if (!user) {
      return next(setError(401, "Incorrect login credentials!"));
    }

    const passwordIsValid = await verifyPassword(password, user.password);
    if (!passwordIsValid) {
      return next(setError(401, "Incorrect login credentials!"));
    } else {
      const token = generateToken({ id: user._id });
      const { password: userPassword, ...restUser } = user; // separating user-info from password / restUser is everything but the password
      return res.status(200).json({ data: { token: token, user: restUser } });
    }
  } catch (err) {
    return next(setError(400, "Unable to login!"));
  }
};

module.exports = { registerUser, loginUser };
