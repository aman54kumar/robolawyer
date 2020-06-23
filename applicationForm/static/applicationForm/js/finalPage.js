function pdfEmailSubmit(e) {
  e.preventDefault();

  console.log(e.target);
  cardParentElement = e.target.parentElement.parentElement.parentElement;
  console.log(cardParentElement);
  firstInput = document.getElementById("pdfEmail").value;

  var csrftoken = getCookie("csrftoken");
  $.ajax({
    type: "POST",
    url: "/form/email",
    data: {
      emailInput: firstInput,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function () {
      console.log("PDF sent via Email");
    },
  });
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

$(document).ready(function () {
  $(".email_form").click(pdfEmailSubmit);
});
