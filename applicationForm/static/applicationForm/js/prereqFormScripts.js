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
  // 2. The facts you are complaining about concern:
  $("input[name='page1[concernYou]']").change(function () {
    var concernYouVal = $("input[name='page1[concernYou]']:checked").val();
    if (concernYouVal === "ConcernIndividual") {
      $("input[name='page2[applicantType]'][value='Individual']")
        .prop("checked", true)
        .trigger("change");
      $("input[name='page3[indRepresentativeType]'][value='selfRepresented']")
        .prop("checked", true)
        .trigger("change");
    } else if (concernYouVal === "ConcernOrganisation") {
      $("input[name='page2[applicantType]'][value='Organisation']")
        .prop("checked", true)
        .trigger("change");
      $("input[name='page3[orgRepresentativeType]'][value='orgNoLawyer']")
        .prop("checked", true)
        .trigger("change");
    } else if (concernYouVal === "OtherClose") {
      $("input[name='page2[applicantType]'][value='Individual']")
        .prop("checked", true)
        .trigger("change");
      $("input[name='page3[indRepresentativeType]'][value='non-lawyer']")
        .prop("checked", true)
        .trigger("change");
    } else if (concernYouVal === "ClientIndividual") {
      $("input[name='page2[applicantType]'][value='Individual']")
        .prop("checked", true)
        .trigger("change");
      $("input[name='page3[indRepresentativeType]'][value='lawyer']")
        .prop("checked", true)
        .trigger("change");
    } else if (concernYouVal === "ClientJuridical") {
      $("input[name='page2[applicantType]'][value='Organisation']")
        .prop("checked", true)
        .trigger("change");
      $("input[name='page3[orgRepresentativeType]'][value='orgYesLawyer']")
        .prop("checked", true)
        .trigger("change");
    } else {
      console.log("check for errors");
    }
  });
});

// 6-month comply
$("input[name='page1[complySix]']").change(function () {
  result = this.value;

  if (result === "Yes") {
    Swal.fire(
      "",
      "If you have not exhausted the available legal remedies your application may be declared inadmissible. <br/> The Court does not demand that you make use of remedies which are ineffective or apply for special discretionary or extraordinary remedies outside the normal appeal procedures. Nonetheless, it is required from you to bring proof that the existing legal remedies are ineffective."
    );
  }
});

$("input[name='page1[courtCase]']").change(function () {
  result = this.value;

  if (result == "No") {
    Swal.fire(
      "",
      "If you have not used all the available domestic legal remedies for your case, it is possible that your application may be declared inadmissible. <br/>In some cases a lower court is considered sufficient, as long as the decision that you received is a final decision."
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

$("#finalDecisionDate").on("change", function () {
  finalDecisionDate = moment($("#finalDecisionDate").val(), "DD/MM/YYYY");

  currentDate = moment({ h: 0 });
  protocol15Date = moment("01/02/2022", "DD/MM/YYYY");

  console.log(finalDecisionDate);
  console.log(currentDate);
  console.log(protocol15Date);

  const diffDate = moment(currentDate).diff(
    moment(finalDecisionDate),
    "months",
    true
  );
  console.log(diffDate);
  if (moment(finalDecisionDate).isBefore(protocol15Date)) {
    if (!isNaN(diffDate)) {
      if (diffDate < 6) {
        sixFutureDate = moment(finalDecisionDate)
          .add(6, "months")
          .format("DD/MM/YYYY");
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
  } else {
    if (diffDate < 4) {
      const fourFutureDate = moment(finalDecisionDate)
        .add(4, "months")
        .format("DD/MM/YYYY");
      Swal.fire(
        "",
        "Attention, according to the information entered in the date field, you must send your application in good time before " +
          fourFutureDate +
          "."
      );
    } else {
      Swal.fire(
        "",
        "You have missed the 4 months time limit imposed by the Court. It is very likely that your application is declared inadmissible."
      );
    }
  }

  $(".feedback_submit").click(feedbackSubmit);
});
