const indexRouter = require("express").Router();
const gamesRoutes = require("./gamesRoutes");
const platformsRoutes = require("./platformsRoutes");
const usersRoutes = require("./usersRoutes");

indexRouter.use("/games", gamesRoutes);
indexRouter.use("/platforms", platformsRoutes);
indexRouter.use("/users", usersRoutes);

module.exports = { indexRouter };
