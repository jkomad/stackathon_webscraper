const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const app = express();

//static middleware
app.use(express.static(path.join(__dirname, "..", "/public")));

//cors policy
app.use(cors());

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routing
app.use("/api", require("./api"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
