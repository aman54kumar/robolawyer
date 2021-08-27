$(document).ready(function () {
  $(".reviewQuestions")
    .find("tr")
    .find("td:not(:first-child)")
    .addClass("lead aright")
    .css("font-family", "lato-thin");

  $(".reviewQuestions").find("tr").find("td:first-child").css({
    width: "50%",
    "font-family": "lato-thin",
    "font-weight": "600",
    "font-size": "1.25rem",
  });

  // $(".reviewQuestions")
  //   .find("tr")
  //   .find("td")
  //   .first()
  //   .css("font-weight", "bold !important");
  // $(".reviewQuestions").find("tr").find("td").css("width", "60%");
  // adding two buttons
  addButtonsToReview();
  // Start of page 1
  $("#involvedStates").on("change", function (e) {
    let curValue = $("#involvedStates").val();
    let curValueWithSpace = curValue.join(", ");
    $("#page1-1").text(curValueWithSpace);
  });

  $("input[name='page1[concernYou]']").on("change", function (e) {
    curValue = $("input[name='page1[concernYou]']:checked").val();
    if (curValue === "ConcernIndividual") {
      curValue = "You directly";
    } else if (curValue === "ConcernOrganisation") {
      curValue = "Your organisation";
    } else if (curValue === "OtherClose") {
      curValue =
        "A close relative or a person under your care or responsibility who is unable to lodge an application";
    } else if (curValue === "ClientIndividual") {
      curValue = "My client who is an individual person";
    } else if (curValue === "ClientJuridical") {
      curValue = "My client who is a juridical person";
    }
    $("#page1-2").text(curValue);
  });

  $("#decisionDate1").on("change", function (e) {
    curValue = $("#decisionDate1").val();
    $("#page1-3-1").text("Start: " + curValue);
  });
  $("#decisionDate2").on("change", function (e) {
    curValue = $("#decisionDate2").val();
    $("#page1-3-2").text("Stop: " + curValue);
  });

  $("input[name='page1[courtCase]']").on("change", function (e) {
    curValue = $("input[name='page1[courtCase]']:checked").val();
    $("#page1-4").text(curValue);
  });

  $("input[name='page1[complySix]']").on("change", function (e) {
    curValue = $("input[name='page1[complySix]']:checked").val();
    $("#page1-5").text(curValue);
  });

  $("#finalDecisionDate").on("change", function (e) {
    curValue = $("#finalDecisionDate").val();
    $("#page1-6").text(curValue);
  });

  $("#referenceText").on("input", function () {
    curValue = this.value;
    $("#page1-7").text(curValue);
  });

  //    End of Page 1

  // Start of Page 2

  $("input[name='page2[applicantType]']").change(function () {
    result = this.value;
    $("#page2-1").text(result);
    if (result === "Individual") {
      $("#indReview").removeClass("is-hidden");
      $("#orgReview").addClass("is-hidden");
      $("#reviewRepIndividual").removeClass("is-hidden");
      $("#reviewRepOrganisation").addClass("is-hidden");
    } else if (result === "Organisation") {
      $("#orgReview").removeClass("is-hidden");
      $("#indReview").addClass("is-hidden");
      $(".reviewRepOrganisation").removeClass("is-hidden");
      $(".reviewRepIndividual").addClass("is-hidden");
      $(".reviewRepOrgNL").removeClass("is-hidden");
      $("#reviewTable3").removeClass("is-hidden");
    } else {
      console.log("check for bug");
    }
  });

  $("#indSurname").on("input", function () {
    curValue = this.value;
    $("#page2-ind-1").text(curValue);
  });
  $("#indFirstName").on("input", function () {
    curValue = this.value;
    $("#page2-ind-2").text(curValue);
  });
  $("#birthDate").on("change", function () {
    curValue = this.value;
    $("#page2-ind-3").text(curValue);
  });
  $("#indPob").on("input", function () {
    curValue = this.value;
    $("#page2-ind-4").text(curValue);
  });
  $("#indNationality").on("focus change", function () {
    curValue = this.value;
    $("#page2-ind-5").text(curValue);
  });
  $("#indAddress").on("input", function () {
    curValue = this.value;
    $("#page2-ind-6").text(curValue);
  });
  $("#indPhone").on("input", function () {
    curValue = this.value;
    $("#page2-ind-7").text(curValue);
  });
  $("#indEmail").on("input", function () {
    curValue = this.value;
    $("#page2-ind-8").text(curValue);
  });
  $("input[name='page2[applicantSex]']").change(function () {
    result = this.value;
    $("#page2-ind-9").text(result);
  });
  $("#anonReqText").on("input", function () {
    anonText = this.value;
    $("#page2-ind-10").html(
      "<a id='page2-ind-10-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page2-ind-10-text").on("click", function () {
      var wnd = window.open("Anonymity Request", "", "_blank");
      wnd.document.write(anonText);
      wnd.focus();
      return false;
    });
  });

  //   End of Individual

  //  Start of Organisation
  $("#orgName").on("input", function () {
    curValue = this.value;
    $("#page2-org-1").text(curValue);
  });
  $("#orgActivity").on("input", function () {
    curValue = this.value;
    $("#page2-org-2").text(curValue);
  });
  $("#orgDate").on("change", function () {
    curValue = this.value;
    $("#page2-org-3").text(curValue);
  });
  $("#orgID").on("input", function () {
    curValue = this.value;
    $("#page2-org-4").text(curValue);
  });
  $("#orgAddress").on("input", function () {
    curValue = this.value;
    $("#page2-org-5").text(curValue);
  });
  $("#orgPhone").on("input", function () {
    curValue = this.value;
    $("#page2-org-6").text(curValue);
  });
  $("#orgEmail").on("input", function () {
    curValue = this.value;
    $("#page2-org-7").text(curValue);
  });
  $("#anonReqText").on("input", function () {
    anonText = this.value;
    $("#page2-org-8").html(
      "<a id='page2-org-8-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page2-org-8-text").on("click", function () {
      var wnd = window.open("Anonymity Request", "", "_blank");
      wnd.document.write(anonText);
      wnd.focus();
      return false;
    });
  });

  //   End of Organisation

  // End of Page 2

  // Start of Page 3
  // Start of page 3 ind NL
  $("input[name='page3[indRepresentativeType]']").change(function () {
    if (result === "lawyer") {
      $(".reviewRepIndL").removeClass("is-hidden");
      $("#reviewTable3").removeClass("is-hidden");
      $(".reviewRepIndividual").removeClass("is-hidden");
      $(".reviewRepIndNL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-L").text(result);
    } else if (result === "non-lawyer") {
      $(".reviewRepIndNL").removeClass("is-hidden");
      $("#reviewTable3").removeClass("is-hidden");
      $(".reviewRepIndividual").removeClass("is-hidden");
      $("#reviewRepIndL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-NL").text(result);
    } else if (result === "selfRepresented") {
      $("#reviewTable3").removeClass("is-hidden");
      $(".reviewRepIndividual").removeClass("is-hidden");
      $(".reviewRepSelf").removeClass("is-hidden");
      $(".reviewRepIndNL").addClass("is-hidden");
      $(".reviewRepIndL").addClass("is-hidden");
      $("#page3-ind-rep-self").text("Self Represented. Proceed to next page.");
    } else {
      console.log("check for bugs");
    }
  });

  $("#indNLCapacity").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-1").text(curValue);
  });
  $("#indNLSurname").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-2").text(curValue);
  });
  $("#indNLFirstName").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-3").text(curValue);
  });
  $("#indNLAddress").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-4").text(curValue);
  });
  $("#indNLNationality").on("focus change", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-5").text(curValue);
  });
  $("#indNLEmail").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-6").text(curValue);
  });
  $("#indNLTel").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-7").text(curValue);
  });
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if ($("#indNLFaxOption")) {
      $("#page3-ind-rep-NL-8").text("I do not have a fax number.");
    } else {
      curValue = $("#indNLFax").val();
      $("#page3-ind-rep-NL-8").text(curValue);
    }
  });

  $("#indIndeComms").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-9").text(curValue);
  });
  // End of Page 3 ind NL

  // Start of Page 3 ind L
  $("#indLSurname").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-1").text(curValue);
  });
  $("#indLFirstName").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-2").text(curValue);
  });
  $("#indLAddress").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-3").text(curValue);
  });
  $("#indLNationality").on("focus change", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-4").text(curValue);
  });
  $("#indLTel").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-6").text(curValue);
  });
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if ($("#indLFaxOption").prop("checked")) {
      $("#page3-ind-rep-L-7").text("I do not have a fax number.");
    } else {
      curValue = $("#indLFax").val();
      $("#page3-ind-rep-L-7").text(curValue);
    }
  });
  $("#indLEmail").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-5").text(curValue);
  });
  $("#indIndeComms").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-8").text(curValue);
  });

  // End of Page 3 ind L

  // Start of page 3 org NL
  $("#orgnlCapacity").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-1").text(curValue);
  });
  $("#orgnlSurname").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-2").text(curValue);
  });
  $("#orgnlFirstName").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-3").text(curValue);
  });
  $("#orgnlAddress").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-4").text(curValue);
  });
  $("#orgnlNationality").on("focus change", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-5").text(curValue);
  });
  $("#orgnlTel").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-7").text(curValue);
  });
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if ($("#orgNLFaxOption").prop("checked")) {
      $("#page3-org-rep-NL-8").text("I do not have a fax number.");
    } else {
      curValue = $("#orgnlFax").val();
      $("#page3-org-rep-NL-8").text(curValue);
    }
  });
  $("#orgnlEmail").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-6").text(curValue);
  });

  $("input[name='page3[orgRepresentativeType]']").change(function () {
    result = this.value;

    if (result === "orgYesLawyer") {
      $(".reviewRepOrgL").removeClass("is-hidden");
      $("#page3-org-rep-NL-9").text("Yes");
      $("#orglSurname").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-1").text(curValue);
      });
      $("#orglFirstName").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-2").text(curValue);
      });
      $("#orglAddress").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-3").text(curValue);
      });
      $("#orglNationality").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-4").text(curValue);
      });
      $("#orglEmail").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-5").text(curValue);
      });
      $("#orglTel").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-6").text(curValue);
      });
      $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
        if ($("#orgLFaxOption").prop("checked")) {
          $("#page3-org-rep-L-7").text("I do not have a fax number.");
        } else {
          curValue = $("#orglFax").val();
          $("#page3-org-rep-L-7").text(curValue);
        }
      });
      $("#orgIndeComms").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-8").text(curValue);
      });
    } else if (result === "orgNoLawyer") {
      $(".reviewRepOrgL").addClass("is-hidden");
      $("#page3-org-rep-NL-9").text("No");
    } else {
      console.log("check for bugs");
    }
  });

  // End of page 3 org NL

  // Start of page 3 org L *** removed because old code when orgL and orgNL were different sections, remove after testing ***
  // $("#orglSurname").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-1").text(curValue);
  // });
  // $("#orglFirstName").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-2").text(curValue);
  // });
  // $("#orglAddress").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-3").text(curValue);
  // });
  // $("#orglNationality").on("focus change", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-4").text(curValue);
  // });
  // $("#orglEmail").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-5").text(curValue);
  // });
  // $("#orglTel").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-6").text(curValue);
  // });
  // $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
  //   curValue = $("#orglFax").value;
  //   $("#page3-org-rep-L-7").text(curValue);
  // });

  // $("#orgIndeComms").on("input", function () {
  //   curValue = this.value;
  //   $("#page3-org-rep-L-8").text(curValue);
  // });

  // End of page 3 org L
  // End of page 3

  // Start of page 4
  $("#stofFacts").on("input", function () {
    stOfFactsText = this.value;
    $("#page4-1").html(
      "<a id='page4-1-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page4-1-text").on("click", function () {
      var wnd = window.open(
        "Statement of Facts",
        "Statement of Facts",
        "_blank"
      );
      wnd.document.write(stOfFactsText);
      wnd.focus();
      return false;
    });
  });

  $("#stofFactsExtra").on("input", function () {
    stOfFactsExtraText = this.value;
    $("#page4-2").html(
      "<a id='page4-2-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page4-2-text").on("click", function () {
      var wnd = window.open(
        "Statement_of_Facts_Extra",
        "Statement_of_Facts_Extra",
        "_blank"
      );
      wnd.document.write(stOfFactsExtraText);
      wnd.focus();
      return false;
    });
  });
  // End of Page 4

  // Start of Page 5
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    $("#articleBody").empty();
    articlesList = $(".articleArea");
    descriptionList = $(".articleExplanation");
    articlesList.each(function (item) {
      $("#articleBody").append(
        "<tr><td>" +
          String(articlesList[item].value) +
          "</td> <td>" +
          String(descriptionList[item].value) +
          "</td> </tr>"
      );
    });
  });

  // End of Page 5

  // to split article string for getting only number
  // end of algorithm
  // Start of Page 6
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    $("#complaintBody").empty();
    complaintList = $(".complainSelect");
    remediesList = $(".remedies");
    articlePassList = $(".preArticleSelect");
    complaintList.each(function (item) {
      $("#complaintBody").append(
        "<tr><td>" +
          String(complaintList[item].value) +
          "</td> <td>" +
          String(remediesList[item].value) +
          "</td> </tr>"
      );
    });
  });

  // $("#complaintButton").on("click", function () {
  //   var click = $(this).data("clicks") || 0;
  //   if (click % 2 == 0) {
  //     complaintList = $(".complainSelect");
  //     remediesList = $(".remedies");
  //     articlePassList = $(".preArticleSelect");
  //     complaintList.each(function (item) {
  //       $("#complaintBody").append(
  //         "<tr><td>" +
  //           (
  //             String(getArticleString(articlePassList[item].value)) + "- "
  //           ).concat(String(complaintList[item].value)) +
  //           "</td> <td>" +
  //           String(remediesList[item].value) +
  //           "</td> </tr>"
  //       );
  //     });
  //   } else {
  //     $("#complaintBody").empty();
  //   }
  //   $(this).data("clicks", click + 1);
  // });

  $("#appealDescribe").on("input", function (e) {
    curValue = $("#appealDescribe").val().trim();
    if (curValue.length > 1 || curValue.length === 1) {
      $("#page6-1").text(curValue);
    } else {
      $("#page6-1").text("All remedies exhausted");
    }
  });

  // End of Page 6

  // Start of Page 7
  $("#intInvestigationDesc").on("input", function (e) {
    curValue = $("#intInvestigationDesc").val().trim();
    if (curValue.length > 1 || curValue.length === 1) {
      $("#page7-1").text(curValue);
    } else {
      $("#page7-1").text(
        "No complaints in another procedure of international investigation or settlement raised"
      );
    }
  });

  $("#prevAppDesc").on("change", function (e) {
    curValue = $("#prevAppDesc").val().trim();
    if (curValue.length > 1 || curValue.length === 1) {
      $("#page7-2").text($("#prevAppDesc").val());
    } else {
      $("#page7-2").text("None");
    }
  });

  // End of Page 7

  // Start of Page 8
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    $("#docsBody").empty();
    docsDateList = $(".docsDate");
    docsTitleList = $(".docsTitle");
    docsDescList = $(".docsDesc");
    docsPagesList = $(".docsPages");
    docsDateList.each(function (item) {
      $("#docsBody").append(
        "<tr><td>" +
          String(docsDateList[item].value) +
          "</td> <td>" +
          String(docsTitleList[item].value) +
          "</td> <td>" +
          String(docsDescList[item].value) +
          "</td> <td>" +
          String(docsPagesList[item].value) +
          "</td> </tr>"
      );
    });
  });
  // End of Page 8

  // Start of Page 9
  $("#formComments").on("input", function () {
    curValue = this.value;
    $("#page9-1").text(curValue);
  });
  $("input[name='page9[signatureDeclaration]']").on("change", function () {
    curValue = $("input[name='page9[signatureDeclaration]']:checked").val();
    $("#page9-2").text(curValue);
    if (curValue === "Applicant") {
      $("#page9-3q").text("Name of Applicant");
      $("#page9-3").text($("#confirmationApplicantName").val());
      $("#page9-4q").text("Address of Applicant");
      $("#page9-4").text($("#confirmationApplicantAddress").val());
    } else if (curValue === "Representative") {
      $("#page9-3q").text("Name of Representative");
      $("#page9-3").text($("#confirmationRepresentativeName").val());
      $("#page9-4q").text("Address of Representative");
      $("#page9-4").text($("#confirmationRepresentativeAddress").val());
    } else {
      console.log("error in page 9");
    }
  });

  $("input[name='page9[signAccuracyDeclaration]']").on("change", function () {
    curValue = $("input[name='page9[signAccuracyDeclaration]']:checked").val();
    if (curValue === "Applicant") {
      $("#page9-5").text("The Applicant");
    } else if (curValue === "Representative") {
      $("#page9-5").text("The Representative");
    } else {
      console.log("error sign accuracy declaration section");
    }
  });
  // End of Page 9
});

function addButtonsToReview() {
  buttonHTML =
    '<button class="reviewButton descButton" onclick="showHideSectionToggle(this)">Show Description <i class="fas fa-eye"></i></button><button class="reviewButton questionButton" onclick="showHideSectionToggle(this)">Show Questions <i class="fas fa-eye"></i></button>';
  buttonHTMLforDisabled =
    '<button class="reviewButton descButton" onclick="showHideSectionToggleSingleButton(this)">Show Description <i class="fas fa-eye"></i></button>';
  $(".reviewTitle").append(buttonHTML);
  $(".reviewTitleDisabled").append(buttonHTMLforDisabled);
}

function showHideSectionToggle(element) {
  descriptionSection = element.parentElement.parentElement.children[1];
  questionSection = element.parentElement.parentElement.children[2];

  if (element.classList.contains("descButton")) {
    toggleText(element, "Description");
    descriptionSection.classList.toggle("is-hidden");
  } else if (element.classList.contains("questionButton")) {
    toggleText(element, "Questions");
    questionSection.classList.toggle("is-hidden");
  }
}

function showHideSectionToggleSingleButton(element) {
  descriptionSection = element.parentElement.parentElement.children[1];
  if (element.classList.contains("descButton")) {
    toggleText(element, "Description");
    descriptionSection.classList.toggle("is-hidden");
  }
}

function toggleText(targetElement, textString) {
  $(targetElement).html(
    $(targetElement).html() ===
      "Show " + textString + ' <i class="fas fa-eye"></i>'
      ? "Hide " + textString + ' <i class="fas fa-eye-slash"></i>'
      : "Show " + textString + ' <i class="fas fa-eye"></i>'
  );
}

// function otherButtonToggle(otherTargetSection, otherButton, textString) {
//   console.log(otherButton);
//   if (!$(otherTargetSection).hasClass("is-hidden")) {
//     $(otherTargetSection).addClass("is-hidden");
//     toggleText(otherButton, textString);
//   }
// }
