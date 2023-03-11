const db = require("./database");
const Movie = require("./models/Movie");
const Game = require("./models/Game");
const Book = require("./models/Book");
const Anime = require("./models/Anime");

module.exports = {
  db,
  Movie,
  Game,
  Book,
  Anime,
};
