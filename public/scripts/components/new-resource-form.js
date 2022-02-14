const $newResourceForm = $(`
  <form action="/api/resources" method="post" class="new-resource-form">
    <div class="new-resource-title">
        <label for="new-resource-title">Title</label>
        <input type="text" name="title" placeholder="Title" >
    </div>

    <div class="new-resource-url">
        <label for="new-resource-url">URL</label>
        <input type="url" name="url" placeholder="URL" >
    </div>

    <div class="new-resource-description">
        <label for="new-property-form__description">Description</label>
        <textarea placeholder="Description" name="description" cols="30" rows="10"></textarea>
    </div>

    <label for="topic">Choose a topic:</label>
      <select name="topic">
        <optgroup label="Markup/Design">
            <option value=""></option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="scss">SASS</option>
        </optgroup>
        <optgroup label="Languages">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
        </optgroup>
        <option value="others">Others</option>
      </select>
    </div>
    </form>
    <button type="submit>Submit</button>
  `);

$(() => {
  console.log("READY");
  $(".btn--new").on("click", () => {
    console.log("add new button clicked!!!");
    $(".resource-containter").prepend($newResourceForm);
  });
});
