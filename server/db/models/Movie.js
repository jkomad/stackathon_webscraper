const Sequelize = require("sequelize");
const db = require("../database");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tomatoMeter: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  audienceScore: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Movie;
