const express = require("express");
const app = express();
const path = require("path");
const port = process.argv[2] || process.env.PORT || 3000;
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const authRoutes = require("./Routes/authRoute");
const adoptantRoute = require("./Routes/adoptantRoute");
const animalRoute = require("./Routes/animalRoute");
const adoptionRoute = require("./Routes/adoptionRoute"); 



app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 


app.use("/auth", authRoutes);
app.use("/adoptants", adoptantRoute);
app.use("/animals", animalRoute);
app.use("/adoption", adoptionRoute);

app.get("/", (req, res) => {
  res.render("pages/index"); // Fixed path for index page
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
