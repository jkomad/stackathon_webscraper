const router = require("express").Router();

router.use("/books", require("./books"));
router.use("/anime", require("./anime"));
router.use("/games", require("./games"));
router.use("/movies", require("./movies"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
