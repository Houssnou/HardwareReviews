var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Please enter a valid Name.",

  },
  // `body` is of type String
  body: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model('Comment', CommentSchema);

// Export the Comment model
module.exports = Comment;