const puppeteer = require("puppeteer");
const router = require("express").Router();
const { Game } = require("../db");
let url =
  "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered";

// GET /api/games
router.get("/", async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

//POST /api/games
router.post("/", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch();
    //function for scraping game information from metacritic
    const extractGames = async (url) => {
      const page = await browser.newPage({ headless: false });
      await page.goto(url);
      console.log(`scraping ${url}`);
      //scrape for desired data

      const gamesOnPage = await page.evaluate(() => {
        const games = [];
        const gameTags = document.querySelectorAll(".clamp-summary-wrap");
        gameTags.forEach((gameTag) => {
          const title = gameTag.querySelector("a > h3").innerText;
          const rank = gameTag.querySelector("span").innerText;
          const score = gameTag.querySelector("div > a > div").innerText;
          const game = {
            title,
            rank,
            score,
          };
          games.push(game);
        });
        return games;
      });
      await page.close();
      //use recursion to navigate to different url
      if (
        url ===
        "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered?page=3"
      ) {
        console.log("terminating scraper...");
      } else {
        if (
          url ===
          "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered"
        ) {
          url =
            "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered?page=0";
        }
        const pageNumber = parseInt(url.match(/page=(\d+)$/)[1]) + 1;
        const nextUrl = `https://www.metacritic.com/browse/games/score/metascore/all/all/filtered?page=${pageNumber}`;
        return gamesOnPage.concat(await extractGames(nextUrl));
      }
    };
    const games = await extractGames(url);
    const updatedGames = games.slice(0, 250);
    const newGames = await Promise.all(
      updatedGames.map((game) => {
        return Game.create(game);
      })
    );
    await browser.close();
    res.json(newGames);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
