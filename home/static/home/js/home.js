// $(document).ready(function () {
//   $(".navbar-nav .nav-item .nav-link").click(function () {
//     $(".navbar-nav .nav-item .nav-link").removeClass("active");
//     $(this).addClass("active");
//   });
// });

$("#down-arrow-scroll").on("click", function (event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      1000,
      function () {
        window.location.hash = hash;
      }
    );
  }
});
