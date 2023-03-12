const Sequelize = require("sequelize");
const db = require("../database");

const Game = db.define("game", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Game;
