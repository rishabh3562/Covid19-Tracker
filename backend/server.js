const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/userModel");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const { yellow } = require("colors");
const connectDB = require("./config/db");
const cors = require('cors'); // Added this line for CORS
dotenv.config();
const uri = process.env.MONGO_URI;

connectDB();
const app = express();

app.use(cors(
  {
    origin: '*'
  }
)); // Use CORS middleware to allow all origins

app.use(express.json()); // to accept JSON data

app.use("/api/user", userRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get('/', async (req, res) => {
    try {
      const data = await User.find({});
      console.log("/ route data  ")
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}...` + yellow.bold)
);
