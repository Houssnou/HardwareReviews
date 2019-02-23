const router = require("express").Router();
// import any api routes
const commentsRoutes = require("./commentsRoutes");
const reviewsRoutes = require("./reviewsRoutes");

// prefix api routes with their specific endpoint name
router.use("/reviews", reviewsRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;