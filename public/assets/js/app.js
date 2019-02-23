$(document).ready(() => {
  //event listener for a click on scrape button
  $("#scrape-button").on("click", () => {
    //ajax call to scrape the data from guru3d then populate the db and build the accordion elts
    $.ajax({
      method: "POST",
      url: "/api/reviews"
    }).then(function (dbReviews) {
      console.log(dbReviews);
      /*  dbReviews.forEach((review,index) => {
         
       }); */
    });

  });

});