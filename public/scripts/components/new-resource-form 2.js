$(() => {
  console.log("READY");
  $(".btn--new").on("click", () => {
    console.log("add new button clicked!!!");
    const classes = $("#resource-create").attr("class");
    if (classes.includes("hide")) {
      $("#resource-create").removeClass("hide");
      $("#resource-create").addClass("add");
    } else {
      $("#resource-create").removeClass("add");
      $("#resource-create").addClass("hide");
    }
  });
});
