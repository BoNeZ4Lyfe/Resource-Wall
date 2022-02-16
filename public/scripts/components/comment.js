$(() => {
  const classesOnComment = $("#comment-create").attr("class");
  const classesOnBtn = $(".btn--new").attr("class");
  const classesOnResources = $(".resource-containter").attr("class");

  $(".btn--comment").on("click", (e) => {
    console.log(e);
    if (classesOnComment.includes("hide")) {
      $("#comment-create").toggle();
    }

    if (classesOnBtn.includes("show")) {
      $(".btn--new").toggle();
    }

    if (classesOnResources.includes("show")) {
      $(".resource-containter").toggle();
    }
  });

  $("#comment-create").on("submit", (e) => {
    e.preventDefault();
    const comment = $("#comment-text").val();
    console.log("comment:", comment);
    // const value = comment.serialize();

    $.post("/resources/comments", comment).then(() => {
      console.log("success");
    });

    if (classesOnComment.includes("hide")) {
      $("#comment-create").toggle();
    }

    if (classesOnBtn.includes("show")) {
      $(".btn--new").toggle();
    }

    if (classesOnResources.includes("show")) {
      $(".resource-containter").toggle();
    }
  });
});
