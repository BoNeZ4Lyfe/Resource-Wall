$(() => {
  const button = document.getElementsByClassName("btn--comment");

  $(button).on("click", () => {
    console.log(this);
  })

});
