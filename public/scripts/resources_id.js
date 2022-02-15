$(() => {
  const resource = JSON.parse(resourceData);
  const comments = JSON.parse(commentData);

  $("#post").on("click", () => {
    $.post(`/resources/:id`, { resource: resource.id, user: resource.user_id })
      .done(() => {});
  });

  const renderResourceElement = (resource) => {
    const htmlContent = `
    <div id="resource-main">
      <header class="resource-head-foot">
        <h4>${resource.title}</h4>
        <h4>${resource.topic}</h4>
        </header>
        <div class="resource-content">
        <a href="${resource.url}">${resource.url}</a>
        <p class="main-text">${resource.description}<p>
        <p>Created ${timeago.format(resource.created_at)} by ${resource.creator}</p>
      </div>
      <footer class="resource-head-foot">
        <p>${Math.round((Number(resource.rating) + Number.EPSILON) * 100) / 100} ⭐️</p>
        <p>${resource.likes} 👍</p>
      </footer>
    </div>`;

    $("body").prepend(htmlContent);
  };

  const createCommentElement = (comment) => {
    return `
    <article class="comment">
      <div class="resource-content">
        <p class="main-text">${comment.comment}</p>
        <p>Written ${timeago.format(comment.created_at)} by ${comment.user_name}</p>
      </div>
    </article>`;
  }

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
      renderComments(comments[comments.length-1]);
    }

  }

  loadComments("all");
  renderResourceElement(resource);
});
