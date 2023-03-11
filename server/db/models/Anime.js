const Sequelize = require("sequelize");
const db = require("../database");

const Anime = db.define("anime", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Anime;
