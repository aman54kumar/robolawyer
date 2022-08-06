$(document).ready(function () {
  function showTextNewWindow(textString, docTitle) {
    const useScreenWidth = window.screen.width;
    const htmlTextString = textString.replace(/\r?\n|\r/g, "<br>");
    Swal.fire({
      title: docTitle,
      html: `<p class="reviewPopupText">${htmlTextString}</p>`,
      width: useScreenWidth,
      allowOutsideClick: false,
      showCloseButton: true,
      customClass: {
        title: "reviewPopupHeading",
      },
    });
  }

  $(".reviewQuestions")
    .find("tr")
    .find("td:not(:first-child)")
    .addClass("lead aright")
    .css("font-family", "lato-thin");

  $(".reviewQuestions").find("tr").find("td:first-child").css({
    width: "40%",
    "font-family": "lato-thin",
    "font-weight": "400",
    "font-size": "1.25rem",
  });

  const answerType = {
    INPUT: "Input",
    RADIO: "Radio",
    SELECT: "Select",
  };
  const getAnswerValue = (selectorValue, typeOfAnswer) => {
    switch (typeOfAnswer) {
      case answerType.INPUT: {
        return $(selectorValue).val();
      }
      case answerType.RADIO: {
        result = document
          .querySelector(selectorValue)
          ?.parentElement.querySelector("label")
          .innerText.replace(/[^a-zA-Z\s]/g, "")
          .replaceAll("\n", "");
        return result;
      }
      case answerType.SELECT: {
        return [...document.querySelector(selectorValue)]
          .filter((option) => option.selected)
          .map((option) => option.value)
          .join(", ");
      }
      default: {
        console.log("check for error");
      }
    }
  };
  // adding two buttons
  addButtonsToReview();
  // Start of page 1

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    document.getElementById("page1-1").innerText =
      getAnswerValue("#involvedStates", answerType.SELECT) ?? "";

    document.getElementById("page1-2").innerText =
      getAnswerValue(
        "input[name='page1[concernYou]']:checked",
        answerType.RADIO
      ) ?? "";

    document.getElementById("page1-3").innerText =
      getAnswerValue("#decisionDate1", answerType.INPUT) ?? "";

    document.getElementById("page1-4").innerText =
      getAnswerValue(
        "input[name='page1[courtCase]']:checked",
        answerType.RADIO
      ) ?? "";

    document.getElementById("page1-5").innerText =
      getAnswerValue(
        "input[name='page1[complySix]']:checked",
        answerType.RADIO
      ) ?? "";

    document.getElementById("page1-6").innerText = getAnswerValue(
      "#finalDecisionDate",
      answerType.INPUT
    );

    document.getElementById("page1-7").innerText = [
      getAnswerValue(
        "input[name='page1[referenceOption]']:checked",
        answerType.RADIO
      ),
      getAnswerValue("input[name='page1[referenceText]']", answerType.INPUT),
    ]
      .filter((val) => val)
      .join(", ");
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
    var anonText = this.value;
    $("#page2-ind-10").html(
      "<a id='page2-ind-10-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page2-ind-10-text").on("click", function () {
      showTextNewWindow(anonText, docDetails.anon.title);
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
      showTextNewWindow(anonText, docDetails.anon.title);
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
    const indNLFaxBoolean = document.getElementById("indNLFaxOption").checked;
    if (indNLFaxBoolean === true) {
      const noFaxText = document.getElementById("indNLFaxArea").value;
      $("#page3-ind-rep-NL-8").html(
        "No, <a id='page3-ind-rep-NL-8-text' href='#'>Click here to view the document you created.</a>"
      );
      $("#page3-ind-rep-NL-8-text").on("click", function () {
        showTextNewWindow(noFaxText, docDetails.indNLFax.title);
      });
    } else {
      //yes
      curValue = $("#indNLFax").val();
      $("#page3-ind-rep-NL-8").text(curValue);
    }
  });

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if ($("#indNLEmployedLYes").is(":checked")) {
      document.querySelector(".reviewRepIndL").classList.remove("is-hidden");
    }
    document
      .getElementById("page3-ind-rep-L-8")
      .closest(".reviewComponent")
      .classList.add("is-hidden");
    document
      .getElementById("page3-ind-rep-L-9")
      .closest(".reviewComponent")
      .classList.add("is-hidden");
    document
      .getElementById("page3-ind-rep-NL-9")
      .closest(".reviewComponent")
      .classList.remove("is-hidden");
    document
      .getElementById("page3-ind-rep-NL-10")
      .closest(".reviewComponent")
      .classList.remove("is-hidden");
  });

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if (document.querySelector(".indNLAuthorityQn:checked")) {
      const indNLAuthBoolean = document.querySelector(
        ".indNLAuthorityQn:checked"
      ).value;
      if (indNLAuthBoolean === "no") {
        const noAuthText = document.getElementById("indNLAuthArea").value;
        $("#page3-ind-rep-NL-9").html(
          "No, <a id='page3-ind-rep-NL-9-text' href='#'>Click here to view the document you created.</a>"
        );
        $("#page3-ind-rep-NL-9-text").on("click", function () {
          showTextNewWindow(noAuthText, docDetails.indNLAuth.title);
        });
      } else {
        //yes
        $("#page3-ind-rep-NL-9").text("Yes");
      }
    }
  });

  $("#indIndeComms").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-NL-10").text(curValue);
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
  $("#indLEmail").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-5").text(curValue);
  });
  $("#indLTel").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-6").text(curValue);
  });
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    const indLFaxBoolean = document.getElementById("indLFaxOption").checked;
    if (indLFaxBoolean === true) {
      const noFaxText = document.getElementById("indLFaxArea").value;
      $("#page3-ind-rep-L-7").html(
        "No, <a id='page3-ind-rep-L-7-text' href='#'>Click here to view the document you created.</a>"
      );
      $("#page3-ind-rep-L-7-text").on("click", function () {
        showTextNewWindow(noFaxText, docDetails.indLFax.title);
      });
    } else {
      //yes
      const curValue = $("#indLFax").val();
      $("#page3-ind-rep-L-7").text(curValue);
    }
  });

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if (document.querySelector(".indLAuthorityPower:checked")) {
      const indLAuthBoolean = document.querySelector(
        ".indLAuthorityPower:checked"
      ).value;
      if (indLAuthBoolean === "No") {
        const noAuthText = document.querySelector(".indLAuthArea").value;
        $("#page3-ind-rep-L-8").html(
          "No, <a id='page3-ind-rep-L-8-text' href='#'>Click here to view the document you created.</a>"
        );
        $("#page3-ind-rep-L-8-text").on("click", function () {
          showTextNewWindow(noAuthText, docDetails.indLAuth.title);
        });
      } else {
        //yes
        $("#page3-ind-rep-L-8").text("Yes");
      }
    }
  });

  $("#indLIndeComms").on("input", function () {
    curValue = this.value;
    $("#page3-ind-rep-L-9").text(curValue);
  });

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if ($("#LotherNLYes").is(":checked")) {
      document.querySelector(".reviewRepIndNL").classList.remove("is-hidden");
    }
    document
      .getElementById("page3-ind-rep-L-8")
      .closest(".reviewComponent")
      .classList.remove("is-hidden");
    document
      .getElementById("page3-ind-rep-L-9")
      .closest(".reviewComponent")
      .classList.remove("is-hidden");
    document
      .getElementById("page3-ind-rep-NL-9")
      .closest(".reviewComponent")
      .classList.add("is-hidden");
    document
      .getElementById("page3-ind-rep-NL-10")
      .closest(".reviewComponent")
      .classList.add("is-hidden");
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
    const orgNLFaxBoolean = document.getElementById("orgNLFaxOption").checked;
    if (orgNLFaxBoolean === true) {
      const noFaxText = document.getElementById("orgNLFaxArea").value;
      $("#page3-org-rep-NL-8").html(
        "No, <a id='page3-org-rep-NL-8-text' href='#'>Click here to view the document you created.</a>"
      );
      $("#page3-org-rep-NL-8-text").on("click", function () {
        showTextNewWindow(noFaxText, docDetails.orgOffFax.title);
      });
    } else {
      //yes
      curValue = $("#orgnlFax").val();
      $("#page3-org-rep-NL-8").text(curValue);
    }
  });

  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    if (document.querySelector(".orgOffEntitled:checked")) {
      const orgNLAuthBoolean = document.querySelector(
        ".orgOffEntitled:checked"
      ).value;
      if (orgNLAuthBoolean === "no") {
        const noAuthText = document.querySelector("#orgNLOfficialAreaNo").value;
        $("#page3-org-rep-NL-9").html(
          "No, <a id='page3-org-rep-NL-9-text' href='#'>Click here to view the document you created.</a>"
        );
        $("#page3-org-rep-NL-9-text").on("click", function () {
          showTextNewWindow(noAuthText, docDetails.orgAuth.title);
        });
      } else {
        //yes
        $("#page3-org-rep-NL-9").text("Yes");
      }
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
      $("#page3-org-rep-NL-10").text("Yes");
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
      $("#orglNationality").on("focus change", function () {
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
        const orgLFaxBoolean = document.getElementById("orgLFaxOption").checked;
        if (orgLFaxBoolean === true) {
          const noFaxText = document.getElementById("orgLFaxArea").value;
          $("#page3-org-rep-L-7").html(
            "No, <a id='page3-org-rep-L-7-text' href='#'>Click here to view the document you created.</a>"
          );
          $("#page3-org-rep-L-7-text").on("click", function () {
            showTextNewWindow(noFaxText, docDetails.orgLFax.title);
          });
        } else {
          //yes
          curValue = $("#orglFax").val();
          $("#page3-org-rep-L-7").text(curValue);
        }
      });

      $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
        if (document.querySelector(".orgAttorney:checked")) {
          const orgLAuthBoolean = document.querySelector(
            ".orgAttorney:checked"
          ).value;
          if (orgLAuthBoolean === "no") {
            const noAuthText =
              document.querySelector("#orgAutorityAreaNo").value;
            $("#page3-org-rep-L-8").html(
              "No, <a id='page3-org-rep-L-8-text' href='#'>Click here to view the document you created.</a>"
            );
            $("#page3-org-rep-L-8-text").on("click", function () {
              showTextNewWindow(noAuthText, docDetails.orgAuth.title);
            });
          } else {
            //yes
            $("#page3-org-rep-L-8").text("Yes");
          }
        }
      });

      $("#orgIndeComms").on("input", function () {
        curValue = this.value;
        $("#page3-org-rep-L-9").text(curValue);
      });
    } else if (result === "orgNoLawyer") {
      $(".reviewRepOrgL").addClass("is-hidden");
      $("#page3-org-rep-NL-10").text("No");
    } else {
      console.log("check for bugs");
    }
  });

  // End of page 3 org NL

  // Start of page 3 org L *** removed because old code when orgL and orgNL were different sections, remove after testing ***

  // End of page 3 org L
  // End of page 3

  // Start of page 4
  $("#stofFacts").on("input", function () {
    stOfFactsText = this.value;
    $("#page4-1").html(
      "<a id='page4-1-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page4-1-text").on("click", function () {
      showTextNewWindow(stOfFactsText, "Statement of Facts");
    });
  });

  $("#stofFactsExtra").on("input", function () {
    stOfFactsExtraText = this.value;
    $("#page4-2").html(
      "<a id='page4-2-text' href='#'>Click here to view the document you created</a>"
    );
    $("#page4-2-text").on("click", function () {
      showTextNewWindow(stOfFactsExtraText.fact.title);
    });
  });
  // End of Page 4

  // Start of Page 5
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    const articlesList = document.querySelectorAll(".articleArea");
    const descriptionList = document.querySelectorAll(".articleExplanation");
    document.getElementById("reviewTable5").innerHTML = "";
    const baseDiv = document.getElementById("reviewTable5");
    let articleHTMLString = [];
    for (let i = 0; i < articlesList.length; i++) {
      articleHTMLString.push(
        `<div class='reviewComponent'><p class='reviewQuestion'>Articles Invoked</p><p class='reviewAnswer'>${articlesList[i].value}</p><p class='reviewQuestion'>Explanation</p><p class='reviewAnswer'>${descriptionList[i].value}</p></div>`
      );
    }
    for (const articleObject of articleHTMLString) {
      baseDiv.innerHTML += articleObject + "<hr>";
    }
    baseDiv.lastChild.remove();
  });

  // End of Page 5

  // Start of Page 6
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    const complainList = document.querySelectorAll(".complainSelect");
    const remediesList = document.querySelectorAll(".remedies");
    document.getElementById("reviewTable6").innerHTML = "";
    const baseDiv = document.getElementById("reviewTable6");
    let complainHTMLString = [];
    for (let i = 0; i < complainList.length; i++) {
      complainHTMLString.push(
        `<div class='reviewComponent'><p class='reviewQuestion'>Complaint</p><p class='reviewAnswer'>${complainList[i].value}</p><p class='reviewQuestion'>Remedies Used</p><p class='reviewAnswer'>${remediesList[i].value}</p></div>`
      );
    }
    for (const complainObject of complainHTMLString) {
      baseDiv.innerHTML += complainObject + "<hr>";
    }
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
  $("#stepperFormTrigger10, #gotoPage10").on("click", function () {
    const docsDateList = document.querySelectorAll(".docsDate");
    const docsTitleList = document.querySelectorAll(".docsTitle");
    const docsDescList = document.querySelectorAll(".docsDesc");
    const docsPagesList = document.querySelectorAll(".docsPages");
    document.getElementById("reviewTable8").innerHTML = "";
    const baseDiv = document.getElementById("reviewTable8");
    let docsHTMLString = [];
    for (let i = 0; i < docsDateList.length; i++) {
      docsHTMLString.push(
        `<div class='reviewComponent'><p class='reviewQuestion'>Date</p><p class='reviewAnswer'>${docsDateList[i].value}</p><p class='reviewQuestion'>Title</p><p class='reviewAnswer'>${docsTitleList[i].value}</p><p class='reviewQuestion'>Description</p><p class='reviewAnswer'>${docsDescList[i].value}</p><p class='reviewQuestion'>No. of Pages</p><p class='reviewAnswer'>${docsPagesList[i].value}</p></div>`
      );
    }
    for (const docsObject of docsHTMLString) {
      baseDiv.innerHTML += docsObject + "<hr>";
    }
    baseDiv.lastChild.remove();
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
  $(".reviewTitle").append(
    "<div style='font-size: medium'>" + buttonHTML + "</div>"
  );
  $(".reviewTitleDisabled").append(
    "<div style='font-size: medium'>" + buttonHTMLforDisabled + "</div>"
  );
}

function showHideSectionToggle(element) {
  // descriptionSection = element.parentElement.parentElement.children[1];
  descriptionSection = element
    .closest(".reviewTitle")
    .parentElement.querySelector(".reviewDescription");
  questionSection = element
    .closest(".reviewTitle")
    .parentElement.querySelector(".reviewQuestions");

  if (element.classList.contains("descButton")) {
    toggleText(element, "Description");
    descriptionSection.classList.toggle("is-hidden");
  } else if (element.classList.contains("questionButton")) {
    toggleText(element, "Questions");
    questionSection.classList.toggle("is-hidden");
  }
}

function showHideSectionToggleSingleButton(element) {
  descriptionSection = element
    .closest(".reviewTitleDisabled")
    .parentElement.querySelector(".reviewDescription");
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
