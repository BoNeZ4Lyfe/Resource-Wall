$(() => {
  const classesOnComment = $("#comment-create").attr("class");
  const classesOnBtn = $(".btn--new").attr("class");
  const classesOnResources = $(".resource-containter").attr("class");

  $(".btn--comment").on("click", () => {
    if (classesOnComment.includes("hide")) {
      $("#comment-create").removeClass("hide");
      $("#comment-create").addClass("show");
    }

    if (classesOnBtn.includes("show")) {
      $(".btn--new").removeClass("show");
      $(".btn--new").addClass("hide");
    }

    if (classesOnResources.includes("show")) {
      $(".resource-containter").removeClass("show");
      $(".resource-containter").addClass("hide");
    }
  });

  // $("#comment-create").on("submit", (e) => {
  //   e.preventDefault();
  //   const comment = $("#comment-text").val();
  //   console.log("comment:", comment);

  //   $.post("/resources/comments", comment).then(() => {
  //     console.log("success");
  //   });

  //   if (classesOnComment.includes("hide")) {
  //     $("#comment-create").toggle();
  //   }

  //   if (classesOnBtn.includes("show")) {
  //     $(".btn--new").toggle();
  //   }

  //   if (classesOnResources.includes("show")) {
  //     $(".resource-containter").toggle();
  //   }
  // });
});
