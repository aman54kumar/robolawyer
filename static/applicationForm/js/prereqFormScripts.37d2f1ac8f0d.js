$("#finalDecisionDate").on("change", function () {
  finalDecisionDate = moment($("#finalDecisionDate").val(), "DD/MM/YYYY");
  finalDecisionDate = moment(finalDecisionDate, "DD/MM/YYYY").format(
    "YYYY-MM-DD"
  );
  currentDate = moment().format("YYYY-MM-DD");
  diffDate = moment(currentDate).diff(
    moment(finalDecisionDate),
    "months",
    true
  );
  if (!isNaN(diffDate)) {
    if (diffDate < 6) {
      sixFutureDate = moment(finalDecisionDate)
        .add(6, "months")
        .format("DD-MM-YYYY");
      Swal.fire(
        "",
        "Attention, according to the information entered in the date field, you must send your application in good time before " +
          sixFutureDate +
          "."
      );
    } else if (diffDate > 6) {
      Swal.fire(
        "",
        "You have missed the 6 months time limit imposed by the Court. It is very likely that your application is declared inadmissible."
      );
    } else {
      console.warn("check for problem");
    }
  }
});

// Feedback form
var curPageNum = function (pageNumValue) {
  console.log(pageNumValue.value);
  document.getElementById("sugPageNo").value = pageNumValue.value;
};

function feedbackSubmit(e) {
  e.preventDefault();

  console.log(e.target);
  cardParentElement = e.target.parentElement.parentElement.parentElement;
  console.log(cardParentElement);
  firstInput = document.getElementById("sugPageNo").value;
  radioInput = $('input:radio[name="legalTrained"]:checked').val();
  $('input[name="legalTrainedInput"]').val(radioInput);
  thirdInput = cardParentElement.getElementsByTagName("textarea")[0].value;
  secondInput = radioInput;

  var csrftoken = getCookie("csrftoken");
  $.ajax({
    type: "POST",
    url: "/form/feedback",
    data: {
      pageNo: firstInput,
      legalExp: secondInput,
      suggestion: thirdInput,
      csrfmiddlewaretoken: csrftoken,
    },
    success: function () {
      Swal.fire("", "Feedback Submitted");
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
  $(".feedback_submit").click(feedbackSubmit);
});

//////////////////////////////////////////////////////////////////
$("input[name='page1[complySix]']").change(function () {
  result = this.value;

  if (result === "Yes") {
    Swal.fire(
      "",
      "If you have not exhausted the available legal remedies your application may be declared inadmissible."
    );
  }
});

$("input[name='page1[courtCase]']").change(function () {
  result = this.value;

  if (result == "No") {
    Swal.fire(
      "",
      "If you have not used all the available domestic legal remedies for your case, it is possible, but not necessary that your application may be declared inadmissible."
    );
  }
});

$("input[name='page1[referenceOption]']").change(function () {
  result = this.value;
  if (result === "Yes") $(".referenceField").removeClass("is-hidden");
  else {
    $(".referenceField").addClass("is-hidden");
  }
});
