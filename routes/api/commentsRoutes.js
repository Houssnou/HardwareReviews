const router = require("express").Router();
const commentsController = require("../../controllers/commentsControllers");

// methods for /api/comment (GET, POST,PUT and DELETE)
router
  .route("/")
  .get(commentsController.getAllComments);


//methods for /api/:reviewId
router
  .route("/:reviewId")
  .post(commentsController.createComment);

/*  for later on we want to update or delete a comment 
  //methods for api/comments/:id (PUT)
router
  .route("/:id")
  .put(commentsController.)
  .delete(commentsController.); */


module.exports = router;