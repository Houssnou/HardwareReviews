$(document).ready(() => {
  //on load get the data from the data base
  const displayData=()=>{
    $.ajax({
      method: "GET",
      url: "/api/reviews"
    }).then((dbReviews) => {
      console.log(dbReviews);
      //lets build the accordion with the data from the create button
      dbReviews.forEach((review, index) => {
        //build the card
        const $card = $("<card>");
        //the header
        const $cardheader = $(`<div class='card-header' id='heading${index+1}'>`);
        //div row to wrap the line : title dates actions
        //inside the header we will have a row with 3colums 2-8-2
        const $row = $("<div class='row'>");
        const $Title = $("<div class='col-12 d-flex align-content-start'>");
  
        //button to make the title clikable
        const $buttonTitle = $(
          `<button class='btn btn-link' type='button' 
                        data-toggle='collapse' data-target='#review${index+1}'
                        aria-expanded='false' aria-controls='review${index+1}'
                        style='color: black; font-weight: bold; text-decoration: none'>`
        ).text(review.title).appendTo($Title);
  
  
        //append the title to the row and append this row to the cardHeader
        $row.append($Title).appendTo($cardheader);
  
        const $divCollapse = $(
          `<div id='review${index+1}' aria-labelledby='heading${index+1}' data-parent='#accordion'>`);
  
        //quick check to determine if it should be a class collapse show or not        
        (index === 0) ? $divCollapse.addClass("collapse show"): $divCollapse.addClass("collapse");
  
        const $cardBody = $("<div class='card-body'>");
        //row => col-10 for the author and date
        const $firstRow = $("<div class='row'>");
        const $colAuthor = $("<div class='col-10'>");
        const $colAuthorText = $("<h2>").text(review.author).appendTo($colAuthor);
        // col-2 for the comments 
        const $colComment = $("<div class='col-2'>");
        const $colCommentText = $(`<button class='comments btn btn-primary' data-id='${review._id}' data-toggle='modal' data-target='#comment-modal'>`)
          .text("Comments: ").appendTo($colComment);
        const $colCommentNumber = $("<span class='badge badge-light' id='num-comments'>")
          .text(`${review.comments.length}`).appendTo($colCommentText);
  
        $firstRow.append($colAuthor, $colComment);
  
        //  row => col-12 => <a> for the link 
        const $linkRow = $("<div class='row'>");
        const $colLink = $("<div class='col-12'>");
        const $colLinkText = $("<a>");
        $colLinkText.attr("href", review.link)
          .text(review.link)
          .appendTo($colLink);
        $linkRow.append($colLink);
  
        //line break after the line
        const $lineBreak = $("<br>");
  
        // row => col-4 for the img
        const $bodyRow = $("<div class='row'>");
        const $colImage = $("<div class='col-3'>");
        const $colImageTag = $("<img>");
        $colImageTag.attr("src", review.image)
          .attr("alt", review.image)
          .appendTo($colImage);
  
        //   => col-8 => span  for the description 
        const $colDesc = $("<div class='col-9'>");
        const $colDescText = $("<span>");
        $colDescText.text(review.description)
          .appendTo($colDesc);
  
        $bodyRow.append($colImage, $colDesc);
  
  
        //let build the content of the comment section if reviews.comments exist
        if (review.comments.length > 0) {
          //create new div at the bottom to display the comments
          const $divCommentContent = $("<div class='border border-dark'>");
  
          const $listGroup = $("<div class='list-group table-striped'>");
          //build a list item for each comment
          review.comments.forEach(comment => {
            //build the 
            const $rowComment = $("<div class='list-group-item list-group-item-action flex-column align-items-start'>");
            const $rowInfos = $("<div class='row d-flex w-100 justify-content-start text-muted'>");
            const $colUsername = $("<div class='col-3' style='font-weight: bold'>").text(`Posted by: ${comment.username}`).appendTo($rowInfos);
            const $colCreatedAt = $("<div class='col-9' style='font-weight: bold'>").text(`On: ${moment(comment.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}`).appendTo($rowInfos);
            const $rowBody = $("<div class='row d-flex w-100 justify-content-between text-muted border-0'>");
            const $ptext = $("<div class='col-12'>").text(comment.body).appendTo($rowBody);
  
            //
            $rowComment.append($rowInfos, $rowBody)
            //
            $rowComment.appendTo($listGroup);
          });
          //then append to 
          $listGroup.appendTo($divCommentContent);
          //append firstRow, linkRow, bodyRow all together to divCollape
          $cardBody.append($firstRow, $linkRow, $lineBreak, $bodyRow, $lineBreak, $listGroup).appendTo($divCollapse);
  
        } else {
          //then display the reviews infos w/o building the comment section
          //append firstRow, linkRow, bodyRow all together to divCollape
          $cardBody.append($firstRow, $linkRow, $lineBreak, $bodyRow).appendTo($divCollapse);
        };
        //build the card content
        $card.append($cardheader, $divCollapse).appendTo("#accordion");
      });
    });
  };

  //first display if something exists in the DB
  displayData();

  //event listener for a click on comments buttons.
  $(document).on("click", ".comments", function () {
    //get the values back from the data ()
    const reviewId = $(this).attr("data-id");
    console.log(reviewId);

    //then on click on save comment
    $("#save-comment").on("click", (event) => {
      //avoid reload page
      event.preventDefault();
      //get the data from the form 
      const username = $("#username-input").val().trim();
      const commentcontent = $("#comment-input").val().trim();
      //check if inputs are valid 
      if (username === "" || commentcontent === "") {
        alert("Please enter a name and a valid comment!");
        return false;
      }
      //then build an object Comment
      const newComment = {
        username: username,
        body: commentcontent
      };
      console.log(newComment);
      //ajax call to create the comment with the reviewId as params
      $.ajax({
        url: "/api/comments/" + reviewId,
        method: "POST",
        data: newComment
      }).then(result => {
        //console.log(result);

        //empty the inputs fieds and get rid of the modal
        $("#username-input").val("");
        $("#comment-input").val("");

        location.reload();
      })
    });
  });

  //event listener for a click on scrape button
  $("#scrape-button").on("click", () => {
    //ajax call to scrape the data from guru3d then populate the db and build the accordion elts
    $.ajax({
      method: "POST",
      url: "/api/reviews"
    }).then(function (dbReviews) {
      console.log(dbReviews);
      // then disable the button until a reset is performed 
      $("#scrape-button").hide();
      //run displayData for the new created data
      displayData();
    });
  });

  //event listener for a click on clear all tables
    $("#clear").on("click", () => {
    console.log("Dropping all tables");
    $.ajax({
      url: "/api/reviews",
      method: "DELETE"
    }).then(result => {
      //then enable button scrape to allow users to scrape again
      //console.log(result);
      alert("All reviews have been removed from the BD. Click to scrape again!");
      //make button available
      $("#scrape-button").show();
           
      //empty the accordion
      $("#accordion").empty();
    });
  });
});