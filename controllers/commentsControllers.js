const cnx = require("../config/cnx");
var db = require("../models");

module.exports = {
  //find all comments
  getAllComments: (req, res) => {
    // Grab every document in the Articles collection
    db.Comment.find({})
      .then(function (dbComments) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbComments);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        console.log(err);
        res.json(err);
      });
  },
  //find one comment
  //find all comments by reviews
  //create a comment
  createComment: (req, res) => {
    // Create a new comment in the database
    db.Comment.create(req.body)
      .then(function (dbComment) {
        // If a comment was created successfully, find one review (there's only one) and push the new comment's _id to the cmment's `comments` array
        // { new: true } tells the query that we want it to return the updated reviews -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Review.findOneAndUpdate({
          _id: req.params.reviewId
        }, {
          $push: {
            comments: dbComment._id
          }
        }, {
          new: true
        });
      })
      .then(function (dbReview) {
        // If the Review was updated successfully, send it back to the client
        res.json(dbReview);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        console.log(err);
        res.json(err);
      });
  }

}