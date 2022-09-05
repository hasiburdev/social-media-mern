const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
app.use([cors(), morgan("dev"), express.json()]);

// Routes
readdirSync("./routes").forEach((fileName) =>
  app.use("/", require(`./routes/${fileName}`))
);
app.get("/", (req, res) => res.send("Hello"));

// Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  // Database
  mongoose.connect(process.env.MONGO_DB_URI, () => {
    console.log("MongoDB database connected!");
  });
});
