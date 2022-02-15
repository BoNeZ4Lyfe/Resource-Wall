$(() => {
  $(".btn--comment").on("click", () => {
    const classesOnComment = $("#comment-create").attr("class");
    if (classesOnComment.includes("hide")) {
      $("#comment-create").removeClass("hide");
      $("#comment-create").addClass("show");
    }

    const classesOnBtn = $(".btn--new").attr("class");
    if (classesOnBtn.includes("show")) {
      $(".btn--new").toggle();
    }

    const classesOnResources = $(".resource-containter").attr("class");
    if (classesOnResources.includes("show")) {
      $(".resource-containter").toggle();
    }
  });

  $("#comment-create").on("submit", (e) => {
    e.preventDefault();
    const comment = $("#comment-text").val();
    const value = $("comment-text").serialize();
    console.log("comment:", comment);
    console.log("value:", value);

    $.post("/resources", value).then(() => {
      console.log("success");
    });
  });
});

// Submitting new tweet
// $(".error").hide();
// $("#client-tweet").submit((e) => {
//   e.preventDefault();
//   const tweet = $("#tweet-text").val();

//   if (!tweet) {
//     $(".error").slideDown("slow", () =>
//       $(".error-text").text("💥💥💥Please tweet!🐥🐥🐥")
//     );
//   } else if (tweet.length > 140) {
//     $(".error").slideDown("slow", () =>
//       $(".error-text").text("💥💥💥Your tweet is too long!")
//     );
//   } else {
//     const value = $("#client-tweet").serialize();

//     $.post("/tweets", value).then(() => {
//       console.log("success");
//       loadTweets();
//     });
//   }
// });

// // Load tweets
// const loadTweets = function () {
//   $.ajax({
//     url: "/tweets",
//     method: "GET",
//   }).then(function (data) {
//     renderTweets(data);
//   });
// };

// loadTweets();
