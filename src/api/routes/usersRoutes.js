const { registerUser, loginUser } = require("../controllers/usersControllers");
const usersRoutes = require("express").Router();
const { isAuthenticated } = require("../../middlewares/auth");

usersRoutes.post("/register", [isAuthenticated], registerUser);
usersRoutes.post("/login", loginUser);

module.exports = usersRoutes;
