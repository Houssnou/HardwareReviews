var mongoose = require("mongoose");

let cnx;

// Connect to the Mongo DB
cnx = mongoose.connect("mongodb://localhost/hardwarereviews_db", {
  useNewUrlParser: true
});

// Export the connection so it's available in other parts of the app
module.exports = cnx;