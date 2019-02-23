const router = require("express").Router();
const reviewsController = require("../../controllers/reviewsControllers");

// methods for /api/reviews (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(reviewsController.getAllReviewsPopulated)
  .post(reviewsController.scrapeReviews)
  .delete(reviewsController.clearAll);


/* later on we want to be able to do more actions on reviews
router
      .route("/reset")
      .put( reviewsController.);
router
      .route("/clear")
      .delete(reviewsController.deleteAll); */
  
module.exports = router;