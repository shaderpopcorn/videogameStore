const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    platforms: [
      {
        type: String,
        required: true,
        enum: [
          "PS1",
          "PS2",
          "PS3",
          "PS4",
          "PS5",
          "XBOX360",
          "XBOXONE",
          "SWITCH",
          "WII",
          "PC",
        ],
        trim: true,
      },
    ],
    price: { type: Number, required: true },
    stock: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    collection: "games",
  }
);

const Game = mongoose.model("games", gameSchema);

module.exports = { Game };
