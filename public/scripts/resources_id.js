$(() => {
  const resource = JSON.parse(resourceData);
  const commentArray = JSON.parse(commentData);

  console.log(commentArray);

  const renderResourceElement = (resource) => {
    const htmlContent = `
    <div id="resource-main">
      <header class="resource-head-foot">
        <h4>${resource.title}</h4>
        <h4>${resource.topic}</h4>
        </header>
        <div class="resource-content">
        <a href="${resource.url}">${resource.url}</a>
        <p>${resource.description}<p>
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
      <p>${comment.comment}</p>
      <p>Written ${timeago.format(comment.created_at)} by ${comment.username}</p>
    </article>`;
  }

  const renderComments = (commentArray) => {
    for (const comment of commentArray) {
      $("#comments").prepend(createCommentElement(comment));
    }
  };

  const loadComments = (allOrLast) => {

  }

  renderResourceElement(resource);
})
