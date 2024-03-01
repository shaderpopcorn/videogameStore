const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: "games" }],
  },
  {
    timestamps: true,
    collection: "platforms",
  }
);

const Platform = mongoose.model("platforms", platformSchema);

module.exports = { Platform };
