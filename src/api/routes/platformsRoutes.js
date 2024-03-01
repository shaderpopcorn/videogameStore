// const express = require("express");
// const platformsRouter = express.Router();
const platformsRoutes = require("express").Router(); // replaces lines 1 + 2
const {
  newPlatform,
  getAllPlatforms,
  getPlatformById,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformsControllers");
const { isAuthenticated } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/uploadFile");

platformsRoutes.get("/", getAllPlatforms);
platformsRoutes.get("/:id", getPlatformById);
platformsRoutes.post(
  "/",
  [isAuthenticated],
  uploadFile.single("image"),
  newPlatform
);
platformsRoutes.put(
  "/:id",
  [isAuthenticated],
  uploadFile.single("image"),
  updatePlatform
);
platformsRoutes.delete("/:id", [isAuthenticated], deletePlatform);

module.exports = platformsRoutes;
