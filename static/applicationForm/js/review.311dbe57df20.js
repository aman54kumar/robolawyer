$(document).ready(function () {
  // Start of page 1
  $("#involvedStates").on("change", function (e) {
    curValue = $("#involvedStates").val();
    $("#page1-1").text(curValue);
  });

  $("input[name='page1[concernYou]']").on("change", function (e) {
    curValue = $("input[name='page1[concernYou]']:checked").val();
    if (curValue === "Yes") {
      curValue = "You directly";
    } else if (curValue === "No") {
      curValue =
        "A close relative who is unable to lodge an application himself or herself";
    } else if (curValue === "Other") {
      curValue =
        "A close relative who is unable to lodge an application himself or herself";
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
      "<a id='page2-ind-10-text' href='#'>Click Here</a>"
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
  $("#orgDate").on("input", function () {
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
    $("#page2-org-8").html("<a id='page2-org-8-text' href='#'>Click Here</a>");
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
    result = this.value;
    if (result === "lawyer") {
      $(".reviewRepIndL").removeClass("is-hidden");
      $("#reviewTable3").removeClass("is-hidden");
      $(".reviewRepIndividual").removeClass("is-hidden");
      $(".reviewRepIndNL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-NL").text(result);
    } else if (result === "non-lawyer") {
      $(".reviewRepIndNL").removeClass("is-hidden");
      $("#reviewTable3").removeClass("is-hidden");
      $(".reviewRepIndividual").removeClass("is-hidden");
      $("#reviewRepIndL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-L").text(result);
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
    console.log("here");
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
  $("#indNLFax").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-8").text(curValue);
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
  $("#indLFax").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-7").text(curValue);
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
    $("#page3-org-rep-NL-8").text(curValue);
  });

  $("#orgnlFax").on("input", function () {
    curValue = this.value;
    $("#page3-org-rep-NL-7").text(curValue);
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
    } else if (result === "orgNoLawyer") {
      $(".reviewRepOrgL").addClass("is-hidden");
      $("#page3-org-rep-NL-9").text("No");
    } else {
      console.log("check for bugs");
    }
  });

  // End of page 3 org NL

  // Start of page 3 org L
  $("#orglSurname").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-1").text(curValue);
  });
  $("#orglFirstName").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-2").text(curValue);
  });
  $("#orglAddress").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-3").text(curValue);
  });
  $("#orglNationality").on("focus change", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-4").text(curValue);
  });
  $("#orglEmail").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-5").text(curValue);
  });
  $("#orglTel").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-6").text(curValue);
  });
  $("#orglFax").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-7").text(curValue);
  });

  $("#orgIndeComms").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-8").text(curValue);
  });

  // End of page 3 org L
  // End of page 3

  // Start of page 4
  $("#stofFacts").on("input", function () {
    stOfFactsText = this.value;
    $("#page4-1").html("<a id='page4-1-text' href='#'>Click Here</a>");
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
    $("#page4-2").html("<a id='page4-2-text' href='#'>Click Here</a>");
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
  $("#articleButton").on("click", function () {
    var click = +$(this).data("clicks") || 0;
    if (click % 2 == 0) {
      articlesList = $(".articleSelect");
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
    } else {
      $("#articleBody").empty();
    }
    $(this).data("clicks", click + 1);
  });
  // End of Page 5

  // Start of Page 6
  $("#complaintButton").on("click", function () {
    var click = +$(this).data("clicks") || 0;
    if (click % 2 == 0) {
      complaintList = $(".complainSelect");
      remediesList = $(".remedies");
      complaintList.each(function (item) {
        $("#complaintBody").append(
          "<tr><td>" +
            String(complaintList[item].value) +
            "</td> <td>" +
            String(remediesList[item].value) +
            "</td> </tr>"
        );
      });
    } else {
      $("#complaintBody").empty();
    }
    $(this).data("clicks", click + 1);
  });

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
  $("#docsButton").on("click", function () {
    var click = +$(this).data("clicks") || 0;
    if (click % 2 == 0) {
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
    } else {
      $("#docsBody").empty();
    }
    $(this).data("clicks", click + 1);
  });

  // End of Page 8

  // Start of Page 9
  $("#formComments").on("input", function () {
    curValue = this.value;
    $("#page9-1").text(curValue);
  });
  // End of Page 9
});
