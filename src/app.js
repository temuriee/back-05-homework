require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const playerRoutes = require("./features/players/player.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", playerRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
