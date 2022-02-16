$(() => {
  $(".btn--new").on("click", () => {
    const classesOnCreate = $("#resource-create").attr("class");

    if (classesOnCreate.includes("hide")) {
      $("#resource-create").removeClass("hide");
      $("#resource-create").addClass("show");
    }

    const classesOnBtn = $(".btn--new").attr("class");
    if (classesOnBtn.includes("show")) {
      $(".btn--new").removeClass("show");
      $(".btn--new").addClass("hide");
    }

    $(".resource-containter").toggle();
    // if (classesOnResources.includes("show")) {
    //   $(".resource-containter").removeClass("show");
    //   $(".resource-containter").addClass("hide");
    // }
  });
});
