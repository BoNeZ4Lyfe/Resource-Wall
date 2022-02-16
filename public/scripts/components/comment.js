$(() => {
  const classesOnComment = $("#comment-create").attr("class");

  $(".btn--comment").on("click", () => {
    if (classesOnComment.includes("hide")) {
      $("#comment-create").removeClass("hide");
      $("#comment-create").addClass("show");
    }

    $(".btn--new").toggle();

    $(".resource-container").toggle();
  });

  const idOnResource = $(".resource-content").attr("id");
  console.log("resource_ID", idOnResource);

  $("#comment-create").on("submit", (e) => {
    e.preventDefault();
    const comment = $("#comment-text").val();
    console.log("comment:", comment);

    $.ajax({
      type: "POST",
      url: "/resources/comments",
      data: { comment, resource_id: idOnResource },
    }).then(() => {
      window.location.href = `/resources/${idOnResource}`;
    });

    // $("#comment-create").toggle();

    // $(".btn--new").toggle();

    // $(".resource-container").toggle();
  });
});
