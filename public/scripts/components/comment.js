addconst $newCommentForm = $(`
  <form action="/api/resource_comment" method="post" class="new-comment-form">
    <div class="new-comment-form">
      <label for="new-comment">Comment</label>
      <input type="text" name="comment" placeholder="comment" >
    </div>
  </form>
`);

$(() => {
  console.log("READY");
  $(".btn--comment").on("click", () => {
    console.log("comment btn clicked!!!");
    $(".resource-containter").prepend($newCommentForm);
  });
});
