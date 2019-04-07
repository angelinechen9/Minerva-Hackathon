const express = require("express");
const moment = require("moment");
moment().format();
const organizationsRoute = express.Router();
const Firestore = require("@google-cloud/firestore");
const db = new Firestore({
  projectId: "minerva-hackathon",
  keyFilename: "Minerva Hackathon.json"
});
var organizationsCollectionRef = db.collection("organizations");
organizationsRoute.get("/", (req, res) => {
  let organizations = [];
  organizationsCollectionRef.get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      let date = new Date();
      if (moment(doc.data().expirationDate).isAfter(date.getDate())) {
        organizations.push(doc.data());
      }
    });
    res.render("index.hbs", {
      organizations: organizations
    });
  })
  .catch((err) => {
    console.log(err);
  });
})
organizationsRoute.get("/new", (req, res) => {
  res.render("new.hbs");
})
organizationsRoute.post("/", (req, res) => {
  let foodGroups = [];
  if (req.body.foodGroup1) {
    foodGroups.push("vegetables");
  }
  if (req.body.foodGroup2) {
    foodGroups.push("fruits");
  }
  if (req.body.foodGroup3) {
    foodGroups.push("grains");
  }
  if (req.body.foodGroup4) {
    foodGroups.push("dairy");
  }
  if (req.body.foodGroup5) {
    foodGroups.push("protein");
  }
  var docRef = organizationsCollectionRef.doc(req.body.name);
  var setorganization = docRef.set({
    name: req.body.name,
    address: req.body.address,
    expirationDate: req.body.expirationDate,
    foodGroups: foodGroups
  });
  res.redirect("/");
})
module.exports = organizationsRoute
