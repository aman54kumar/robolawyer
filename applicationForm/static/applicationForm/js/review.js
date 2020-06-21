$(document).ready(function () {
  // Start of page 1
  $("#involvedStates").on("change", function (e) {
    curValue = $("#involvedStates").val();
    $("#page1-1").text(curValue);
  });

  $("#referenceText").on("input", function () {
    curValue = this.value;
    $("#page1-2").text(curValue);
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
      $("#indReview").removeClass("is-hidden");
      $("#reviewRepOrganisation").removeClass("is-hidden");
      $("#reviewRepIndividual").addClass("is-hidden");
      $("#reviewRepOrgNL").removeClass("is-hidden");
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
  $("#indNationality").on("input", function () {
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

  //   End of Organisation

  // End of Page 2

  // Start of Page 3
  // Start of page 3 ind NL
  $("input[name='page3[indRepresentativeType]']").change(function () {
    result = this.value;
    if (result === "lawyer") {
      $("#reviewRepIndL").removeClass("is-hidden");
      $("#reviewRepIndNL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-NL").text(result);
    } else if (result === "non-lawyer") {
      $("#reviewRepIndNL").removeClass("is-hidden");
      $("#reviewRepIndL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-L").text(result);
    } else if (result === "selfRepresented") {
      $("#reviewRepSelf").removeClass("is-hidden");
      $("#reviewRepIndL").addClass("is-hidden");
      $("#reviewRepSelf").addClass("is-hidden");
      $("#page3-ind-rep-self").text(result);
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
  $("#indNLNationality").on("input", function () {
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
  $("#indLNationality").on("input", function () {
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
  $("#orgnlNationality").on("input", function () {
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
    $("#page3-org-rep-NL-9").text(result);
    if (result === "orgYesLawyer") {
      $("#reviewRepOrgL").removeClass("is-hidden");
    } else if (result === "orgNoLawyer") {
      $("#reviewRepOrgL").addClass("is-hidden");
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
  $("#orglNationality").on("input", function () {
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
});
