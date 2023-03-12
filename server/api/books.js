const puppeteer = require("puppeteer");
const router = require("express").Router();
const { Book } = require("../db");
const url =
  "https://www.barnesandnoble.com/b/books/_/N-1fZ29Z8q8?Nrpp=20&page=1";

//GET /api/books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

//POST /api/books
router.post("/", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    //function for extracting books from the given URL
    const extractBooks = async (url) => {
      const page = await browser.newPage();
      await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      );
      await page.goto(url);
      console.log(`scraping ${url}`);

      //scrape for desired data
      const booksOnPage = await page.evaluate(() => {
        const books = [];
        const bookTags = document.querySelectorAll(".product-info-view");
        bookTags.forEach((bookTag) => {
          const title = bookTag.querySelector("h3 > a").innerText;
          let rating = String(
            bookTag
              .querySelector(".bv-off-screen")
              .innerText.match(/^\d\.\d out of 5 stars/)
          );
          if (rating === "0.0 out of 5 stars") {
            rating = "Unavailable";
          }
          const price = bookTag.querySelector(
            "div.product-shelf-pricing.mt-s > table > tbody > tr > td.buy-new.three-column-padding > span.current > a"
          ).innerText;
          const book = {
            title,
            rating,
            price,
          };
          books.push(book);
        });
        return books;
      });

      await page.close();

      if (
        url ===
        "https://www.barnesandnoble.com/b/books/_/N-1fZ29Z8q8?Nrpp=20&page=13"
      ) {
        console.log("terminating scraper...");
        return booksOnPage;
      } else {
        console.log("scrape next page...");
        const pageNumber = parseInt(url.match(/page=(\d+)$/)[1]) + 1;
        const nextUrl = `https://www.barnesandnoble.com/b/books/_/N-1fZ29Z8q8?Nrpp=20&page=${pageNumber}`;
        //use recursion to change the url and extract more book info
        return booksOnPage.concat(await extractBooks(nextUrl));
      }
    };
    const books = await extractBooks(url);
    const newBooks = await Promise.all(
      books.slice(0, 250).map((book) => {
        return Book.create(book);
      })
    );
    await browser.close();
    res.json(newBooks);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
