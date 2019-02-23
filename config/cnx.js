var mongoose = require("mongoose");

let cnx;

// Connect to the Mongo DB
if (process.env.MONGODB_URI){
  cnx = mongoose.connect(process.env.MONGODB_URI);
}else{
cnx = mongoose.connect("mongodb://localhost/hardware_reviews_db", {
  useNewUrlParser: true
});
}
// Export the connection so it's available in other parts of the app
module.exports = cnx;