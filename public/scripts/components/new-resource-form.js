$(() => {
  $(".btn--new").on("click", () => {
    const classesOnCreate = $("#resource-create").attr("class");
    if (classesOnCreate.includes("hide")) {
      $("#resource-create").toggle();
    }

    const classesOnComment = $("#comment-create").attr("class");
    if (classesOnComment.includes("hide")) {
      $("#comment-create").toggle();
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
