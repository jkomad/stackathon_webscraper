const Sequelize = require("sequelize");
const db = require("../database");

const Book = db.define("book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Book;
