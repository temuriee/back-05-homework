const mongoose = require("mongoose");
const Player = require("./player.model");

// GET /about
const getAbout = (req, res) => {
  res.json({
    name: "Temo",
    surname: "Jinjikhadze",
    hobby: "Playing Football",
    profession: "Football Player",
    age: 19,
    height: 1.85,
    weight: 75,
  });
};

// GET /players  (+ optional ?nation=xxx)
const getPlayers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.nation) {
      // case-insensitive search using regex
      filter.nation = { $regex: new RegExp(`^${req.query.nation}$`, "i") };
    }

    // ⭐ Extra: sorted by name
    const players = await Player.find(filter).sort({ name: 1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

// POST /players
const createPlayer = async (req, res) => {
  try {
    const { name, nation, position, age } = req.body;

    // manual type check for age
    if (age !== undefined && typeof age !== "number") {
      return res.status(400).json({ error: "age must be a number" });
    }

    const player = new Player({ name, nation, position, age });
    const saved = await player.save();
    res.status(201).json(saved);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.message });
    }
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

// DELETE /players/:id
const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid player ID" });
    }

    const player = await Player.findByIdAndDelete(id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ message: "Player deleted successfully", player });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

const deleteAllPlayers = async (req, res) => {
  try {
    const result = await Player.deleteMany({});
    res.json({
      message: `Deleted ${result.deletedCount} players successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

module.exports = {
  getAbout,
  getPlayers,
  createPlayer,
  deletePlayer,
  deleteAllPlayers,
};
