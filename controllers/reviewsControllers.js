var db = require("../models");
// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
  //get all reviews
  getAllReviews: (req, res) => {
    // Grab every document in the Reviews collection
    db.Review.find({})
      .then(function (dbReviews) {
        // If we were able to successfully find Reviews, send them back to the client
        res.json(dbReviews);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  //get one review and populate with all comments
  getOneReview: (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Review.findOne({
        _id: req.params.id
      })
      // ..and populate all of the comments associated with it
      .populate("comments")
      .then(function (dbReview) {
        // If we were able to successfully find an Review with the given id, send it back to the client
        res.json(dbReview);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  //get all reviews populated with all comments
  getAllReviewsPopulated: (req, res) => {
    // Grab every document in the Reviews collection
    db.Review.find({})
      .populate("comments")
      .then(function (dbReviews) {
        // If we were able to successfully find Reviews, send them back to the client
        res.json(dbReviews);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  },
  //Important
  //scrape and populates the reviews tables
  scrapeReviews: (req, res) => {
    console.log("Scraping data...");
    // First, we grab the body of the html with axios
    axios.get("https://www.guru3d.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      //create var to hold to the data 
      var results = [];
      $("h1").each(function (i, element) {
        //get the review title
        var title = $(element).text();
        //get the review author
        var author = $(element).next("div.newsstoryheader").text();
        author = author.replace(/(\r\n|\n|\r)/gm, "");
        author = author.split("|");
        author = author[0];
        //get the review link
        var link = "https://www.guru3d.com/";
        link += $(element).next("div.newsstoryheader").children().attr("href");
        //get the review description
        var desc = $(element).next().next("div.content").children("p").text();
        if (!desc) {
          desc = $(element).next().next("div.content2").children("p").text();
        };

        //get the image
        var img = $(element).next().next("div.content").children("div").children("a").children("img").attr("src");
        if (!img) {
          img = $(element).next().next("div.content2").children("div").children("a").children("img").attr("src");
        };
        var imgSrc = "https://www.guru3d.com/" + img;

        //.next("div.newsstoryheader")  $(element).next("div.content2")
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          author: author,
          link: link,
          description: desc,
          image: imgSrc
        });
      });
      //console.log(results);
      //save results into mongoDB 
      db.Review.create(results)
        .then((dbReviews) => {
          // View the added result in the console
          console.log("Data scraped! Inserting in DB...");
          //console.log(dbReviews);
          res.json(dbReviews);
        })
        .catch((err) => {
          // If an error occurred, log it
          console.log(err);
          return res.json(err);
        });
    });
  },
  //delete all reviews and comments
  clearAll: (req, res) => {
    // Grab every document in the Reviews collection
    /* db.dropCollection("Review", (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      req.json(result);
    }); */
  }
}