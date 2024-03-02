const { setError } = require("../../config/error");
const { Game } = require("../models/gamesModel");
const { deleteFile } = require("../../middlewares/deleteFile");

// POST (create)
const newGame = async (req, res, next) => {
  try {
    const GameExists = await Game.findOne({ title: req.body.title });
    if (GameExists) {
      return res.status(400).json("Game already exists!");
    } else {
      const newGame = new Game(req.body);

      if (req.file) {
        newGame.image = req.file.path;
      }

      const gameDB = await newGame.save();
      return res.status(201).json(gameDB);
    }
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getAllGames = async (req, res, next) => {
  try {
    const allGames = await Game.find();
    return res.status(200).json(allGames);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);
  } catch (err) {
    return next(setError(400, err));
  }
};

// PUT (update)
const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldGame = await Game.findById(id);
    const updatedGame = new Game(req.body);
    updatedGame._id = id;

    if (req.file) {
      updatedGame.image = req.file.path;
      if (oldGame.image) {
        deleteFile(oldGame.image);
      }
    }

    if (updatedGame.platforms) {
      const uniqueSet = [
        new Set([...oldGame.platforms, ...updatedGame.platforms]),
      ];
      updatedGame.platforms = Array.from(uniqueSet);
    }

    const newGameInfo = await Game.findByIdAndUpdate(id, updatedGame, {
      new: true,
    });

    return res.status(201).json(newGameInfo);
  } catch (err) {
    return next(setError(400, err));
  }
};

// DELETE (delete)
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ confirmation: "Game Successfully Deleted!", DeletedGame: game });
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = { newGame, getAllGames, getGameById, updateGame, deleteGame };
