const Sequelize = require("sequelize");
const db = require("../database");

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;
