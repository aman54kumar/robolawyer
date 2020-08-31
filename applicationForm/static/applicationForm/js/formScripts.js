// limitLines(6, document.getElementById("indAddress"));
// limitLines(2, document.getElementById("orgName"));
// limitLines(8, document.getElementById("orgAddress"));
// limitLines(6, document.getElementById("indNLAddress"));
// limitLines(6, document.getElementById("indLAddress"));
// limitLines(8, document.getElementById("orgnlAddress"));
// limitLines(8, document.getElementById("orglAddress"));
// limitLines(16, document.getElementById("appealDescribe"));
// limitLines(10, document.getElementById("intInvestigationDesc"));
// limitLines(4, document.getElementById("prevAppDesc"));
// limitLines(5, document.getElementById("formComments"));

// $(".articleExpCounter").textcounter({
//   type: "character",
//   max: 590,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });

// $(".remediesTextCounter").textcounter({
//   type: "character",
//   max: 290,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });

// $(".appealDescribeTextCounter").textcounter({
//   type: "character",
//   max: 1550,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });

// $(".intInvestigationTextCounter").textcounter({
//   type: "character",
//   max: 1850,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });
// $(".prevApplicationTextCounter").textcounter({
//   type: "character",
//   max: 350,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });
// $(".commentTextCounter").textcounter({
//   type: "character",
//   max: 550,
//   countSpaces: true,
//   countDown: true,
//   countDownText: "Characters Remaining: %d",
// });
// // $(".factsTextCounter").textcounter({
// //   type: "character",
// //   max: 15600,
// //   countSpaces: true,
// // });

var applicantTypeOption = function () {
  $("input[name='page2[applicantType]']").change(function () {
    result = this.value;
    if (result === "Individual") {
      $("#generalPage-2").removeClass("is-hidden");
      $("#indBeginner").removeClass("is-hidden");
      $("#orgBeginner").addClass("is-hidden");
      $("#indRepresentative").removeClass("is-hidden");
      $("#orgRepresentative").addClass("is-hidden");
      $("#orgnlNationality").val("");
      $("#orglNationality").val("");
    } else if (result === "Organisation") {
      $("#generalPage-2").removeClass("is-hidden");
      $("#orgBeginner").removeClass("is-hidden");
      $("#indBeginner").addClass("is-hidden");
      $("#orgRepresentative").removeClass("is-hidden");
      $("#indRepresentative").addClass("is-hidden");
      $("#indNationality").val("");
      $("#indNLNationality").val("");
      $("#indLNationality").val("");
    } else {
      console.log("check for bug");
    }
  });
};

applicantTypeOption();

// anonymity Description
$("input[name='page2[applicantAnon]']").change(function () {
  result = this.value;

  if (result === "Yes") {
    $(".applicantAnonReq").removeClass("is-hidden");
  } else {
    $(".applicantAnonReq").addClass("is-hidden");
  }
});
// anonymity Description End

$("input[name='page2[orgDateOption]']").change(function () {
  result = this.value;
  if (result === "Yes") {
    $(".orgDateDiv").removeClass("is-hidden");
  } else {
    $(".orgDateDiv").addClass("is-hidden");
  }
});

$("input[name='page2[orgIdentityOption]']").change(function () {
  result = this.value;
  if (result === "Yes") {
    $(".orgIdentityDiv").removeClass("is-hidden");
  } else {
    $(".orgIdentityDiv").addClass("is-hidden");
  }
});

// ___________________Page4

$("input[name='page3[indRepresentativeType]']").change(function () {
  result = this.value;
  if (result === "lawyer") {
    $("#lawyerRep").removeClass("is-hidden");
    $("#nonLawyerRep").addClass("is-hidden");
    $("#selfRep").addClass("is-hidden");
    $(".indAuthority").removeClass("is-hidden");
    $("#indNLNationality").val("");
  } else if (result === "non-lawyer") {
    $("#nonLawyerRep").removeClass("is-hidden");
    $("#lawyerRep").addClass("is-hidden");
    $("#selfRep").addClass("is-hidden");
    $(".indAuthority").removeClass("is-hidden");
    $("#indLNationality").val("");
  } else if (result === "selfRepresented") {
    $("#reviewRepSelf").removeClass("is-hidden");
    $("#nonLawyerRep").addClass("is-hidden");
    $("#lawyerRep").addClass("is-hidden");
    $(".indAuthority").addClass("is-hidden");
    $("#indNLNationality").val("");
    $("#indLNationality").val("");
  } else {
    console.log("check for bugs");
  }
});

$("input[name='page3[orgRepresentativeType]']").change(function () {
  result = this.value;
  if (result === "orgYesLawyer") {
    $("#orgLawyerRep").removeClass("is-hidden");
    $(".orgAuthority").removeClass("is-hidden");
  } else if (result === "orgNoLawyer") {
    $("#orgLawyerRep").addClass("is-hidden");
    $(".orgAuthority").addClass("is-hidden");
    $("#orglNationality").val("");
  } else {
    console.log("check for bugs");
  }
});

$("#page6Group").repeater({
  btnAddClass: "s-btnAdd",
  btnRemoveClass: "s-btnRemove",
  groupClass: "s-group",
  minItems: 1,
  maxItems: 0,
  startingIndex: 0,
  showMinItemsOnLoad: true,
  reindexOnDelete: true,
  repeatMode: "append",
  animation: "fade",
  animationSpeed: 400,
  animationEasing: "swing",
  clearValues: true,
  afterAdd: function () {
    cur_id = this.id;
    id_no = cur_id.split("_6_")[1];
    for (i = id_no; i >= 0; i--) {
      newID = "addButton_6_" + i;
      currentButtonElement = document.getElementById(newID);
      if (
        currentButtonElement &&
        !currentButtonElement.classList.contains("is-hidden")
      ) {
        currentButtonElement.className += " is-hidden";
      }
    }
  },
  afterDelete: function () {
    groups = $("#page6Group").children();
    divTag = groups.children()[groups.children().length - 1];
    buttonTag = divTag.children[0];
    if (buttonTag.classList.contains("is-hidden")) {
      divTag.children[0].classList.remove("is-hidden");
    }
  },
});

$("#page5Group").repeater({
  btnAddClass: "a-btnAdd",
  btnRemoveClass: "a-btnRemove",
  groupClass: "a-group",
  minItems: 1,
  maxItems: 0,
  startingIndex: 0,
  showMinItemsOnLoad: true,
  reindexOnDelete: true,
  repeatMode: "append",
  animation: "fade",
  animationSpeed: 400,
  animationEasing: "swing",
  clearValues: true,
  afterAdd: function () {
    callAPI(this.id);
    cur_id = this.id;
    id_no = cur_id.split("_5_")[1];
    for (i = id_no; i >= 0; i--) {
      newID = "addButton_5_" + i;
      currentButtonElement = document.getElementById(newID);
      if (
        currentButtonElement &&
        !currentButtonElement.classList.contains("is-hidden")
      ) {
        currentButtonElement.className += " is-hidden";
      }
    }
  },
  afterDelete: function () {
    groups = $("#page5Group").children();
    divTag = groups.children()[groups.children().length - 1];
    buttonTag = divTag.children[0];
    if (buttonTag.classList.contains("is-hidden")) {
      divTag.children[0].classList.remove("is-hidden");
    }
  },
});
// Correspondent details

// Correcpondant details end

// Page 6 condition for text area
$("input[name='page6[appealAvailable]']").change(function () {
  result = this.value;
  if (result === "Yes") $(".appealDescribe").removeClass("is-hidden");
  else {
    $(".appealDescribe").addClass("is-hidden");
  }
});

// Page 6 condition for text area end

// page 7 conditions for text area

$("input[name='page7[intInvestigation]']").change(function () {
  result = this.value;
  if (result === "Yes") $(".intInvestigation").removeClass("is-hidden");
  else {
    $(".intInvestigation").addClass("is-hidden");
  }
});

$("input[name='page7[prevApplications]']").change(function () {
  result = this.value;
  if (result === "Yes") $(".prevAppDesc").removeClass("is-hidden");
  else {
    $(".prevAppDesc").addClass("is-hidden");
  }
});

function textCounter(field, field2, maxlimit) {
  var countfield = document.getElementById(field2);
  if (field.value.length > maxlimit) {
    if (field.id === "stofFacts") {
      var popUpStFactText = document.createElement("div");
      popUpStFactText.style.textAlign = "justify";
      popUpStFactText.innerHTML =
        "You have reached the page limit imposed by the Court. It is possible for you to add a supplementary statement expanding on the facts, complaints or remedies used. This extra statement should not be more than 20 pages. It should not add new complaints or violations but only develop what is already set out in the form. <br/>You can either go back and rephrase your Statement of the facts to comply with the page limit, or you can add extra pages on the Subject matter of the application. Before adding extra pages, make sure that all the central facts are already mentioned in the main Statement of Facts and that you are not adding any additional information, but merely expanding on the already mentioned facts, violations and complaints.";
      swal({
        buttons: ["Go Back", "Add Supplementary Statement"],
        closeOnClickOutside: false,
        content: popUpStFactText,
      });
      $(".extraWritingArea").removeClass("is-hidden");
    }
    if (field.id === "stofFactsExtra") {
      swal(
        "Unfortunately there is no more space available to add extra content in statement of facts according to the guidelines provided by ECtHR. Please try to modify the existing text."
      );
    }
    field.value = field.value.substring(0, maxlimit);

    return false;
  } else {
    countfield.value = maxlimit - field.value.length;
  }
}

$("input[name='page2[applicantAnon]']").change(function () {
  result = this.value;
  console.log(result);
  lines = $("#anonReqText").val();
  pageCount = 0;
  numOfLines = lines.split("\n").length - 1;
  if (numOfLines <= 45) {
    pageCount = 1;
  } else {
    pageCount = 1 + Math.ceil((numOfLines - 45) / 56);
  }
  if (result === "Yes") {
    $("input[name='page8[0][date]']").val(moment().format("DD-MM-YYYY"));
    $("input[name='page8[0][title]']").val("Anonymity Request");
    $("input[name='page8[0][desc]']").val(
      "Documents requesting anonymity in the public documents of the court."
    );
    $("input[name='page8[0][page]']").val(pageCount);
  } else if (result === "No") {
    $("input[name='page8[0][date]']").val("");
    $("input[name='page8[0][title]']").val("");
    $("input[name='page8[0][desc]']").val("");
    $("input[name='page8[0][page]']").val(null);
  } else {
    console.log("no anonymity");
  }
});

$("#page8Group").repeater({
  btnAddClass: "r-btnAdd",
  btnRemoveClass: "r-btnRemove",
  groupClass: "r-group",
  minItems: 2,
  maxItems: 24,
  startingIndex: 0,
  showMinItemsOnLoad: true,
  reindexOnDelete: true,
  repeatMode: "append",
  animation: "fade",
  animationSpeed: 400,
  animationEasing: "swing",
  clearValues: true,
  afterAdd: function () {
    $(".datepicker").datepicker({
      weekStart: 1,
      daysOfWeekHighlighted: "0,6",
      assumeNearbyYear: true,
      autoclose: true,
      todayHighlight: true,
      clearBtn: true,
      showOnFocus: true,
      maxViewMode: "days",
      format: "dd-mm-yyyy",
      orientation: "top left",
      templates: {
        leftArrow: "&lt;",
        rightArrow: "&gt;",
      },
    });
    cur_id = this.id;
    id_no = cur_id.split("_8_")[1];
    for (i = id_no; i >= 0; i--) {
      newID = "addButton_8_" + i;
      currentButtonElement = document.getElementById(newID);
      if (
        currentButtonElement &&
        !currentButtonElement.classList.contains("is-hidden")
      ) {
        currentButtonElement.className += " is-hidden";
      }
    }
  },
  afterDelete: function () {
    groups = $("#page8Group").children();
    divTag = groups.children()[groups.children().length - 1];
    buttonTag = divTag.children[0];
    if (buttonTag.classList.contains("is-hidden")) {
      divTag.children[0].classList.remove("is-hidden");
    }
  },
});

// get cursor position in textarea
$.fn.setCursorPosition = function (position) {
  if (this.length == 0) return this;
  return $(this).setSelection(position, position);
};

$.fn.setSelection = function (selectionStart, selectionEnd) {
  if (this.length == 0) return this;
  var input = this[0];

  if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd("character", selectionEnd);
    range.moveStart("character", selectionStart);
    range.select();
  } else if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }

  return this;
};

var areaArray = $("textArea");

var removedArea = areaArray.splice(9, 2);
jQuery(removedArea).each(function () {
  stOfFactsElement = $(this)[0];
  $(stOfFactsElement).textcounter({
    type: "character",
    max: $(this)[0].maxLength,
    countSpaces: true,
    countDown: true,
    countDownText: "Characters Remaining: %d",
    maxcount: function (el) {
      el = jQuery(el);
      el.off();
      el.on("keydown paste", function (event) {
        keyCodeList = [
          8,
          16,
          17,
          18,
          19,
          20,
          27,
          35,
          36,
          37,
          38,
          39,
          40,
          91,
          92,
          112,
          113,
          114,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          123,
          144,
          145,
        ];
        if (el.attr("id") === "stofFacts") {
          if (!keyCodeList.includes(event.keyCode)) {
            var popUpStFactText = document.createElement("div");
            popUpStFactText.style.textAlign = "justify";
            popUpStFactText.innerHTML =
              "You have reached the page limit imposed by the Court. It is possible for you to add a supplementary statement expanding on the facts, complaints or remedies used. This extra statement should not be more than 20 pages. It should not add new complaints or violations but only develop what is already set out in the form. <br/>You can either go back and rephrase your Statement of the facts to comply with the page limit, or you can add extra pages on the Subject matter of the application. Before adding extra pages, make sure that all the central facts are already mentioned in the main Statement of Facts and that you are not adding any additional information, but merely expanding on the already mentioned facts, violations and complaints.";
            swal({
              buttons: ["Go Back", "Add Supplementary Statement"],
              closeOnClickOutside: false,
              content: popUpStFactText,
            });

            $(".extraWritingArea").removeClass("is-hidden");
          }
        }
      });
    },

    // mincount: function (el) {
    // console.log(el);
    // if (el.id === "stofFacts") {
    //   var popUpStFactText = document.createElement("div");
    //   popUpStFactText.style.textAlign = "justify";
    //   popUpStFactText.innerHTML =
    //     "You have reached the page limit imposed by the Court. It is possible for you to add a supplementary statement expanding on the facts, complaints or remedies used. This extra statement should not be more than 20 pages. It should not add new complaints or violations but only develop what is already set out in the form. <br/>You can either go back and rephrase your Statement of the facts to comply with the page limit, or you can add extra pages on the Subject matter of the application. Before adding extra pages, make sure that all the central facts are already mentioned in the main Statement of Facts and that you are not adding any additional information, but merely expanding on the already mentioned facts, violations and complaints.";
    //   swal({
    //     buttons: ["Go Back", "Add Supplementary Statement"],
    //     closeOnClickOutside: false,
    //     content: popUpStFactText,
    //   });
    //   $(".extraWritingArea").removeClass("is-hidden");
    // }
    // },
  });
});

areaArray.each(function () {
  $(this).textcounter({
    type: "character",
    max: $(this)[0].maxLength,
    countSpaces: true,
    countDown: true,
    countDownText: "Characters Remaining: %d",
  });
});

// $("textArea").on("ready", counterChars(this));

limitLines = function (textarea) {
  limit = textarea.rows;
  var spaces = textarea.getAttribute("cols");
  var limitVal = "";
  textarea.oninput = function (event) {
    var lines = textarea.value.split("\n");

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length <= spaces) continue;
      var j = 0;

      var space = spaces;

      while (j++ <= spaces) {
        if (lines[i].charAt(j) === " ") space = j;
      }

      lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
      if (lines.length > limit) {
        break;
      }
      lines[i] = lines[i].substring(0, space);
    }

    if (lines.length > limit || textarea.value.length >= textarea.maxLength) {
      textarea.style.color = "red";
      setTimeout(function () {
        textarea.style.color = "";
      }, 500);
    }
    if (lines.length > limit && (event.keyCode != 8 || event.keyCode != 46)) {
      textarea.value = limitVal;
      return;
    }
    idTextArea = "#" + String(textarea.id);
    var cursorPosition = $(idTextArea).prop("selectionStart");
    textarea.value = lines.slice(0, limit).join("\n");
    $(idTextArea).setCursorPosition(cursorPosition);
    limitVal = textarea.value;
  };
};

// textAreaLimit("textArea", max_chars);

// console.log(a);

// For page 9 auto filling name and address based on page 2 or 3
$("input[name='page9[signatureDeclaration]']").change(function () {
  result = this.value;
  if (result === "Applicant") {
    $("#correspondentOptionApplicant").removeClass("is-hidden");
    $("#correspondentOptionRepresentative").addClass("is-hidden");
    if (
      $("input[name='page2[applicantType]']:checked").val() === "Individual"
    ) {
      nameValue = $("#indFirstName").val() + " " + $("#indSurname").val();
      addressValue = $("#indAddress")
        .val()
        .replace("\n", ", ")
        .replace(",,", ",")
        .replace(" ,", ",");
    } else {
      nameValue = $("input[name='page2[orgName]']").val();
      addressValue = $("#orgAddress")
        .val()
        .replace("\n", ", ")
        .replace(",,", ",")
        .replace(" ,", ",");
    }
    $("#confirmationApplicantName").val(nameValue);
    $("#confirmationApplicantAddress").val(addressValue);
  } else if (result === "Representative") {
    $("#correspondentOptionApplicant").addClass("is-hidden");
    $("#correspondentOptionRepresentative").removeClass("is-hidden");
    if (
      $("input[name='page2[applicantType]']:checked").val() === "Individual"
    ) {
      if (
        $("input[name='page3[indRepresentativeType]']:checked").val() ===
        "non-lawyer"
      ) {
        nameValue = $("#indNLFirstName").val() + " " + $("#indNLSurname").val();
        addressValue = $("#indNLAddress")
          .val()
          .replace("\n", ", ")
          .replace(",,", ",")
          .replace(" ,", ",");
      } else if (
        $("input[name='page3[indRepresentativeType]']:checked").val() ===
        "lawyer"
      ) {
        nameValue = $("#indLFirstName").val() + " " + $("#indLSurname").val();
        addressValue = $("#indLAddress")
          .val()
          .replace("\n", ", ")
          .replace(",,", ",")
          .replace(" ,", ",");
      } else {
        swal("No representative entered in Page 3");
      }
    } else {
      if (
        $("input[name='page3[orgRepresentativeType]']:checked").val() ===
        "orgYesLawyer"
      ) {
        nameValue = $("#orglFirstName").val() + " " + $("#orglSurname").val();
        addressValue = $("#orglAddress")
          .val()
          .replace("\n", ", ")
          .replace(",,", ",")
          .replace(" ,", ",");
      } else if (
        $("input[name='page3[orgRepresentativeType]']:checked").val() ===
        "orgNoLawyer"
      ) {
        nameValue = $("#orgnlFirstName").val() + " " + $("#orgnlSurname").val();
        addressValue = $("#orgnlAddress")
          .val()
          .replace("\n", ", ")
          .replace(",,", ",")
          .replace(" ,", ",");
      } else {
        swal("Problem in page 3 organisation representative");
      }
    }
    $("#confirmationRepresentativeName").val(nameValue);
    $("#confirmationRepresentativeAddress").val(addressValue);
  } else {
    swal("check for error");
  }
});
