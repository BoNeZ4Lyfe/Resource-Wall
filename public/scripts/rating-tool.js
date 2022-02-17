$(() => {
  const resource = JSON.parse(resourceData);

  $("#rate").on("click", (e) => {
    e.preventDefault;
    $("#rate").hide();
    $("#rating-tool").show();
  });

  $("#st1").on("click", (e) => {
    e.preventDefault;
    $("#rating-tool").hide();
    $("#rate").show();

    $.post("/resources/:id", { resource: resource.id, rating: 1 })
      .done(() => location.reload())
      .catch(err => console.log("rate click: ", err.message));

  });

  $("#st2").on("click", (e) => {
    e.preventDefault;
    $("#rating-tool").hide();
    $("#rate").show();

    $.post("/resources/:id", { resource: resource.id, rating: 2 })
      .done(() => location.reload())
      .catch(err => console.log("rate click: ", err.message));
  });

  $("#st3").on("click", (e) => {
    e.preventDefault;
    $("#rating-tool").hide();
    $("#rate").show();

    $.post("/resources/:id", { resource: resource.id, rating: 3 })
      .done(() => location.reload())
      .catch(err => console.log("rate click: ", err.message));
  });

  $("#st4").on("click", (e) => {
    e.preventDefault;
    $("#rating-tool").hide();
    $("#rate").show();

    $.post("/resources/:id", { resource: resource.id, rating: 4 })
      .done(() => location.reload())
      .catch(err => console.log("rate click: ", err.message));
  });

  $("#st5").on("click", (e) => {
    e.preventDefault();
    $("#rating-tool").hide();
    $("#rate").show();

    $.post("/resources/:id", { resource: resource.id, rating: 5 })
      .done(() => location.reload())
      .catch(err => console.log("rate click: ", err.message));
  });
})
