const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const adoptantRoute = require("./routes/adoptantRoute");
const adminRoute = require("./routes/adminRoute");
const cookieParser = require("cookie-parser");

dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/adoptedpets")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/adoptant", adoptantRoute);
app.use("/admin", adminRoute);


// Server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
