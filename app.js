// app.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.get("/test", (_req, res) => {
  res.json({ message: "Hello from the PulseVote backend!", status: "success" });
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date(),
  });
});

module.exports = app;
