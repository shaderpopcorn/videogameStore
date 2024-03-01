// const express = require("express");
// const gamesRouter = express.Router();
const gamesRoutes = require("express").Router(); // replaces lines 1 + 2
const {
  newGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
} = require("../controllers/gamesControllers");
const { isAuthenticated } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/uploadFile");

gamesRoutes.get("/", getAllGames);
gamesRoutes.get("/:id", getGameById);
gamesRoutes.post("/", [isAuthenticated], uploadFile.single("image"), newGame);
gamesRoutes.put(
  "/:id",
  [isAuthenticated],
  uploadFile.single("image"),
  updateGame
);
gamesRoutes.delete("/:id", [isAuthenticated], deleteGame);

module.exports = gamesRoutes;
