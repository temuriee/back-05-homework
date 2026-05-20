const express = require("express");
const router = express.Router();
const checkRole = require("../../middleware/checkRole");
const {
  getAbout,
  getPlayers,
  createPlayer,
  deletePlayer,
  deleteAllPlayers,
} = require("./player.controller");

router.get("/about", getAbout);
router.get("/players", getPlayers);
router.post("/players", createPlayer);
router.delete("/players/:id", checkRole("admin"), deletePlayer);
router.delete("/players", checkRole("admin"), deleteAllPlayers);
module.exports = router;
