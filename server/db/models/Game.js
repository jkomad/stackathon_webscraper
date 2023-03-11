const Sequelize = require("sequelize");
const db = require("../database");

const Game = db.define("game", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Game;
