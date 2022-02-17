$(() => {
  const classesOnComment = $("#comment-create").attr("class");
  let idOnResource = null;

  $(".btn--comment").on("click", function() {
    if (classesOnComment.includes("hide")) {
      $("#comment-create").removeClass("hide");
      $("#comment-create").addClass("show");
    }

    $(".btn--new").toggle();

    $(".resource-container").toggle();
    idOnResource = $(this).attr("id");
    console.log("resource_ID", idOnResource);
  });


  $("#comment-create").on("submit", (e) => {
    e.preventDefault();
    const comment = $("#comment-text").val();
    console.log("🐥🔴", comment);

    $.ajax({
      type: "POST",
      url: "/resources/comments",
      data: { comment, resource_id: idOnResource },
    }).then(() => {
      window.location.href = `/resources/${idOnResource}`;
    });
  });
});
