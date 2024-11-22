const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
const adoptantRoute = require("./routes/adoptantRoute");
const adminRoute = require("./routes/adminRoute");
const session = require("express-session");

dotenv.config();

const app = express();
/*app.use(cookieParser());*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));



app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/adoptedpets")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/adoptant", adoptantRoute);
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
