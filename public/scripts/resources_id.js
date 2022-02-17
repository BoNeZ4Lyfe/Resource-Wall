$(() => {
  const resource = JSON.parse(resourceData);
  const comments = JSON.parse(commentsData);
  console.log(commentsData);

  createdAt = $("#timeago").html();
  $("#timeago").html(timeago.format(createdAt));

  const createCommentElement = (comment) => {
    return `
    <article class="comment">
      <div class="resource-content">
        <p class="main-text">${comment.comment}</p>
        <p>Written ${timeago.format(comment.created_at)} by ${
      comment.user_name
    }</p>
      </div>
    </article>`;
  };

  const renderComments = (commentArray) => {
    for (const comment of commentArray) {
      $("#comments").prepend(createCommentElement(comment));
    }
  };

  const loadComments = (allOrLast) => {
    if (allOrLast === "all") {
      renderComments(comments);
    }

    if (allOrLast === "last") {
      renderComments(comments[comments.length - 1]);
    }
  };

  loadComments("all");

  const resourceID = $(".resource-content").attr("id");
  const userID = $(".creator").attr("id");

  console.log(resourceID, userID);

  $("#like").on("click", (e) => {
    e.preventDefault();
    console.log("test");

    $.post("/resources/:id", { resource: resource.id, user: resource.user_id })
      .done(() => location.reload())
      .catch(err => console.log("like click: ", err.message));
  });
});
