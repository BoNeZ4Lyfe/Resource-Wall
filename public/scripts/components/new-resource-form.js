$(() => {
  $(".btn--new").on("click", () => {
    const classesOnCreate = $("#resource-create").attr("class");

    if (classesOnCreate.includes("hide")) {
      $("#resource-create").removeClass("hide");
      $("#resource-create").addClass("show");
    }

    $(".btn--new").toggle();

    $(".resource-container").toggle();
  });

  $("#resource-create").on("submit", (e) => {
    e.preventDefault();
    const resourceTitle = $("#resource_title").val();
    const resourceUrl = $("#resource_url").val();
    const resourceDescription = $("#resource_description").val();
    const resourceTopic = $("#resource_topic").val();

    $.ajax({
      type: "POST",
      url: "/resources/new",
      data: {
        title: resourceTitle,
        url: resourceUrl,
        description: resourceDescription,
        topic: resourceTopic,
      },
    }).then((data) => {
      console.log(data);
      window.location.href = `/resources/${data.resource_id}`;
    });
  });
});
