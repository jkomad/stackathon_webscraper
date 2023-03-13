const puppeteer = require("puppeteer");
const router = require("express").Router();
const { Movie } = require("../db");
const url = "https://www.rottentomatoes.com/browse/movies_at_home/";

// GET /api/movie
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
      order: [["id", "ASC"]],
    });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// POST /api/movie
router.post("/", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    //function for scraping data from the rotten tomatoes site
    const extractMovies = async (url) => {
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.goto(url);
      console.log(`scraping ${url}`);

      //scrape for desired data
      const moviesOnPage = await page.evaluate(() => {
        const movies = [];
        const movieTags = document.querySelectorAll("a.js-tile-link");
        movieTags.forEach((movieTag) => {
          const movieInfo = movieTag.querySelector("div");
          const title = movieInfo.querySelector("span").innerText;
          const ratings = movieInfo.querySelector("score-pairs");
          let tomatoMeter = ratings.criticsscore;
          if (tomatoMeter === "") {
            tomatoMeter = "Unavailable";
          }
          let audienceScore = ratings.audiencescore;
          if (audienceScore === "") {
            audienceScore = "Unavailable";
          }
          const movie = {
            title,
            tomatoMeter,
            audienceScore,
          };
          movies.push(movie);
        });
        return movies;
      });

      await page.close();

      //use recursion to navigate to the next page
      if (
        url === "https://www.rottentomatoes.com/browse/movies_at_home/?page=10"
      ) {
        console.log("terminating scraper...");
        return moviesOnPage;
      } else {
        if (url === "https://www.rottentomatoes.com/browse/movies_at_home/") {
          url = "https://www.rottentomatoes.com/browse/movies_at_home/?page=1";
        }
        const pageNumber = parseInt(url.match(/page=(\d+)$/)[1]) + 1;
        const nextUrl = `https://www.rottentomatoes.com/browse/movies_at_home/?page=${pageNumber}`;
        return moviesOnPage.concat(await extractMovies(nextUrl));
      }
    };
    const movies = await extractMovies(url);
    const newMovies = await Promise.all(
      movies.slice(0, 250).map((movie) => {
        return Movie.create(movie);
      })
    );
    await browser.close();
    res.json(newMovies);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
