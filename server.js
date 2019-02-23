const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const logger = require("morgan");

// import routes
const routes = require("./routes");

var PORT = 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//fires up my routes
app.use(routes);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port http://localhost:" + PORT + "/");
});