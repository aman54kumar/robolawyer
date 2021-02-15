$(".extPButton").on("click", function () {
  // console.log($(this));
  // console.log($(this).html());
  // console.log(
  //   $(this).html().trim() === 'Expand <i  class="fa fa-angle-right"></i>'
  // );
  $(this).text($(this).text() === "Expand " ? "Collapse " : "Expand ");
  console.log($(this));
  $(this).children("i").toggleClass("fa-angle-right");
  $(this).children("i").toggleClass("fa-angle-down");
  // $(this).html(
  //   $(this).html() === "Expand &#9654;" ? "Collapse &#25BC;" : "Expand &#9654;"
  // );
  $(this).parent().siblings("p").toggleClass("is-hidden");
  if ($(this).parent().siblings("div")) {
    $(this).parent().siblings("div").toggleClass("is-hidden");
  }
});
