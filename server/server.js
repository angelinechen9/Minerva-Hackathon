const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const organizationsRoute = require("./routes/organizationsRoute.js");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../views", "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
hbs.registerPartials(path.join(__dirname, "../views", "partials"));
app.get("/", (req, res) => {
  res.redirect("/organizations");
})
app.use("/organizations", organizationsRoute);
app.listen(3000);
