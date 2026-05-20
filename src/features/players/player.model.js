const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    nation: {
      type: String,
      required: [true, "Nation is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [15, "Age must be at least 15"],
    },
  },
  { timestamps: true },
);

// ⭐ Extra: index on nation for faster filtering
playerSchema.index({ nation: 1 });

module.exports = mongoose.model("Player", playerSchema);
