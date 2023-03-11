const puppeteer = require("puppeteer");
const router = require("express").Router();
const { Anime } = require("../db");
const url = "https://myanimelist.net/topanime.php?limit=0";

// GET /api/anime
router.get("/", async (req, res, next) => {
  try {
    const anime = await Anime.findAll();
    res.json(anime);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// POST /api/anime
router.post("/", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    //function for extracting list of anime from website
    const extractAnime = async (url) => {
      const page = await browser.newPage();
      await page.goto(url);
      console.log(`scraping ${url}`);

      //scrape for desired data
      const animeOnPage = await page.evaluate(() => {
        const allAnime = [];
        const animeTags = document.querySelectorAll(".ranking-list");
        animeTags.forEach((animeTag) => {
          const animeInfo = animeTag.querySelector(
            ".title.al.va-t.word-break > div.detail"
          );
          const title = animeInfo.querySelector("h3 > a").innerText;
          const rank = animeTag.querySelector(".rank.ac > span").innerText;
          const rating = animeTag.querySelector(
            ".score.ac.fs14 > div > span"
          ).innerText;
          const anime = {
            title,
            rank,
            rating,
          };
          allAnime.push(anime);
        });
        return allAnime;
      });

      await page.close();

      //recursively scrape the next page
      if (url === "https://myanimelist.net/topanime.php?limit=200") {
        console.log(`terminate scraping...`);
        return animeOnPage;
      } else {
        const pageLimit = parseInt(url.match(/limit=(\d+)$/)[1]) + 50;
        const nextUrl = `https://myanimelist.net/topanime.php?limit=${pageLimit}`;
        return animeOnPage.concat(await extractAnime(nextUrl));
      }
    };
    const anime = await extractAnime(url);
    const newAnime = await Promise.all(
      anime.map((anime) => {
        return Anime.create(anime);
      })
    );
    browser.close();
    res.json(newAnime);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
