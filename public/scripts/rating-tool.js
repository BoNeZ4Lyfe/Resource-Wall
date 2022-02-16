$(() =>{
  const resource = JSON.parse(resourceData);

  $("#rate").on("click", () => {
    $("#rate").hide();
    $("#rating-tool").show();
  });

  $("#st1").on("click", () => {
    $("#rating-tool").hide();
    $("#rate").show();
    $.post("/resources/:id", { resource: resource.id, rating: 1 })
      .done(() => {
        console.log("What are the odds this works...");
      });
  });

  $("#st2").on("click", () => {
    $("#rating-tool").hide();
    $("#rate").show();
    $.post("/resources/:id", { resource: resource.id, rating: 2 })
      .done(() => {
        console.log("What are the odds this works...");
      });
  });

  $("#st3").on("click", () => {
    $("#rating-tool").hide();
    $("#rate").show();
    $.post("/resources/:id", { resource: resource.id, rating: 3 })
      .done(() => {
        console.log("What are the odds this works...");
      });
  });

  $("#st4").on("click", () => {
    $("#rating-tool").hide();
    $("#rate").show();
    $.post("/resources/:id", { resource: resource.id, rating: 4 })
      .done(() => {
        console.log("What are the odds this works...");
      });
  });

  $("#st5").on("click", () => {
    $("#rating-tool").hide();
    $("#rate").show();
    $.post("/resources/:id", { resource: resource.id, rating: 5 })
      .done(() => {
        console.log("What are the odds this works...");
      });
  });
})
