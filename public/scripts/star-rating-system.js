$(() => {
  $("#st1").on("mouseenter", function() {
    $(".fa-star").css("color", "grey");
    $("#st1").css("color", "yellow");
  });
});
