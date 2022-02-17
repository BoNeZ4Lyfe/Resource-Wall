$(() => {
  // preserve newlines, etc - use valid JSON
  commentsData = commentsData.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  // remove non-printable and other non-valid JSON chars
  commentsData = commentsData.replace(/[\u0000-\u0019]+/g, "");
  const comments = JSON.parse(commentsData);
  const resource = JSON.parse(resourceData);
  console.log(resource);
  console.log(comments);

  createdAt = $("#timeago").html();
  $("#timeago").html(timeago.format(createdAt));

  const createCommentElement = (comment) => {
    return `
    <article class="comment">
      <div class="resource-content">
        <p class="main-text">${comment.comment}</p>
        <p>Written ${timeago.format(comment.created_at)} by ${comment.user_name
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

  $("#like").on("click", (e) => {
    e.preventDefault();
    console.log("test");

    $.post("/resources/:id", { resource: resource.id, user: resource.user_id })
      .done(() => location.reload())
      .catch(err => console.log("like click: ", err.message));
  });
});
