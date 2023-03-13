const { db, Book, Anime, Game, Movie } = require("./server/db");
const books = [];
const anime = [];
const games = [];
const movies = [];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  await Promise.all(
    books.map((book) => {
      return Book.create(book);
    })
  );

  await Promise.all(
    anime.map((anime) => {
      return Anime.create(anime);
    })
  );

  await Promise.all(
    games.map((game) => {
      return Game.create(game);
    })
  );

  await Promise.all(
    movies.map((movie) => {
      return Movie.create(movie);
    })
  );

  console.log("Clear books table");
  console.log("Clear anime table");
  console.log("Clear games table");
  console.log("Clear movies table");
  console.log("seeded successfully");
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
