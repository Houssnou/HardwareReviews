const router = require("express").Router();

//routes
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/reviews", (req, res) => {
  res.render("reviews");

});

module.exports = router;