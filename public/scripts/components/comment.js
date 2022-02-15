$(() => {
  $(".btn--comment").on("click", () => {
    const classesOnComment = $("#comment-create").attr("class");
    console.log(classesOnComment);

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
});
