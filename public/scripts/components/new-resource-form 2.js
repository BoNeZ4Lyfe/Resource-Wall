// $(() => {
//   console.log("READY");
//   $(".btn--new").on("click", () => {
//     console.log("add new button clicked!!!");
//     const classes = $("#resource-create").attr("class");
//     if (classes.includes("hide")) {
//       $("#resource-create").removeClass("hide");
//       $("#resource-create").addClass("add");
//     } else {
//       $("#resource-create").removeClass("add");
//       $("#resource-create").addClass("hide");
//     }
//   });
// });
$(() => {
  $(".btn--new").on("click", () => {
    const classesOnCreate = $("#resource-create").attr("class");

    if (classesOnCreate.includes("hide")) {
      $("#resource-create").toggle();
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
