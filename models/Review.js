var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new review object
// This is similar to a Sequelize model
var ReviewSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `author` is required and of type String
  author: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
  },
  // `description` is required and of type String
  desctiption: {
    type: String,
    required: true
  },
  // `image` is required and of type String
  image: {
    type: String,
    required: true
  },
  // `comment` is an anrray of objects that stores a comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Review with some associated comments
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Review = mongoose.model('Review', ReviewSchema);

// Export the Article model
module.exports = Review;