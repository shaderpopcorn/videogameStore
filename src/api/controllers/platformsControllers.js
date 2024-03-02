const { setError } = require("../../config/error");
const { Platform } = require("../models/platformsModel");
const { deleteFile } = require("../../middlewares/deleteFile");

// POST (create)
const newPlatform = async (req, res, next) => {
  try {
    const PlatformExists = await Platform.findOne({ name: req.body.name });
    if (PlatformExists) {
      return res.status(400).json("Platform already exists!");
    } else {
      const newPlatform = new Platform(req.body);

      if (req.file) {
        newPlatform.image = req.file.path;
      }

      const platformDB = await newPlatform.save();
      return res.status(201).json(platformDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getAllPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find().populate("games", "title stock"); // populate gets the game instead of only the id, the second parameter says what it should get from the game
    return res.status(200).json(allPlatforms);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getPlatformById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findById(id).populate("games"); // populate entire game
    return res.status(200).json(platform);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT (update)
const updatePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPlatform = await Platform.findById(id);
    const updatedPlatform = new Platform(req.body);
    updatedPlatform._id = id;

    if (req.file) {
      updatedPlatform.image = req.file.path;
      if (oldPlatform.image) {
        deleteFile(oldPlatform.image);
      }
    }

    if (updatedPlatform.games) {
      const uniqueSet = [
        new Set([...oldPlatform.games, ...updatedPlatform.games]),
      ];
      updatedPlatform.games = Array.from(uniqueSet);
    }

    const newPlatformInfo = await Platform.findByIdAndUpdate(
      id,
      updatedPlatform,
      {
        new: true,
      }
    );

    return res.status(201).json(newPlatformInfo);
  } catch (err) {
    return next(setError(400, err));
  }
};

// DELETE (delete)
const deletePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findByIdAndDelete(id);
    return res.status(200).json({
      confirmation: "Platform Successfully Deleted!",
      DeletedPlatform: platform,
    });
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  newPlatform,
  getAllPlatforms,
  getPlatformById,
  updatePlatform,
  deletePlatform,
};
