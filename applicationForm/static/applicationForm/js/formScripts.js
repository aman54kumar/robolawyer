$(".btn-next-form").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    "fast"
  );
});

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
      $("#anonLabelForYes").html(
        "<br/>You need to explain the reasons that justify your request for anonymity, meaning that you must explain why publicising your identity may negatively affect or harm you or another. The Court decides whether you are granted anonymity or not. You should state in the request whether, in the event of anonymity being authorised by the President of the Chamber, you wish to be designated by your initials or by a single letter (e.g. “X”, “Y” or “Z”). <br/> The Court expects to receive this document as an accompanying document to your application. We will generate this text as an additional document when you generate the application form and will automatically add the title and description of this document to the Supporting Document list on page 8. You may add any other documents supporting your request – medical records, witness testimonies, official records – both to the Supporting Documents list on page 8, and as a copy in the attachments to the application.<br />"
      );
    } else if (result === "Organisation") {
      $("#generalPage-2").removeClass("is-hidden");
      $("#orgBeginner").removeClass("is-hidden");
      $("#indBeginner").addClass("is-hidden");
      $("#orgRepresentative").removeClass("is-hidden");
      $("#indRepresentative").addClass("is-hidden");
      $("#indNationality").val("");
      $("#indNLNationality").val("");
      $("#indLNationality").val("");
      $("#anonLabelForYes").html(
        "<br/>You need to explain the reasons that justify your request for anonymity, meaning that you must explain why publicising the identity of the organisation may negatively affect or harm the organisation or another. The Court decides whether anonymity is granted or not. You should state in the request whether, in the event of anonymity being authorised by the President of the Chamber, you wish to be designated by your initials or by a single letter (e.g. “X”, “Y” or “Z”). <br/> The Court expects to receive this document as an accompanying document to your application. We will generate this text as an additional document when you generate the application form and we will automatically add the title and description of this document to the Supporting Document list on page 8. You may add any other documents supporting your request – medical records, official documents – both to the Supporting Documents list on page 8, and as a copy in the attachments to the application.<br/>"
      );
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
    $(".orgDateNoArea").addClass("is-hidden");
    $("#regDateNoDiv").addClass("is-hidden");
  } else {
    $(".orgDateDiv").addClass("is-hidden");
    $(".orgDateNoArea").removeClass("is-hidden");
    $("#regDateNoDiv").removeClass("is-hidden");
  }
});

$("input[name='page2[orgIdentityOption]']").change(function () {
  result = this.value;
  if (result === "Yes") {
    $(".orgIdentityDiv").removeClass("is-hidden");
    $("#orgIDNoDiv").addClass("is-hidden");
    $(".orgIdentityNoArea").addClass("is-hidden");
  } else {
    $(".orgIdentityDiv").addClass("is-hidden");
    $(".orgIdentityNoArea").removeClass("is-hidden");
    $("#orgIDNoDiv").removeClass("is-hidden");
  }
});

$("#indNLFaxOption").on("change", (event) => {
  if ($(event.target).prop("checked")) {
    $("#indNLFax").val("").prop("disabled", true);
    $("#indNLFaxDiv").removeClass("is-hidden");
  } else {
    $("#indNLFax").prop("disabled", false);
    $("#indNLFaxDiv").addClass("is-hidden");
  }
});

$("#indLFaxOption").on("change", (event) => {
  if ($(event.target).prop("checked")) {
    $("#indLFax").val("").prop("disabled", true);
    $("#indLFaxDiv").removeClass("is-hidden");
  } else {
    $("#indLFax").prop("disabled", false);
    $("#indLFaxDiv").addClass("is-hidden");
  }
});

$("#orgNLFaxOption").on("change", (event) => {
  if ($(event.target).prop("checked")) {
    $("#orgnlFax").val("").prop("disabled", true);
    $("#orgNLFaxDiv").removeClass("is-hidden");
  } else {
    $("#orgnlFax").prop("disabled", false);
    $("#orgNLFaxDiv").addClass("is-hidden");
  }
});

$("#orgLFaxOption").on("change", (event) => {
  if ($(event.target).prop("checked")) {
    $("#orglFax").val("").prop("disabled", true);
    $("#orgLFaxDiv").removeClass("is-hidden");
  } else {
    $("#orglFax").prop("disabled", false);
    $("#orgLFaxDiv").addClass("is-hidden");
  }
});
// ___________________Page4

var representativeTypeOption = function () {
  $("input[name='page3[indRepresentativeType]']").change(function () {
    result = this.value;
    if (result === "lawyer") {
      if (!$("#lawyerRep").children()[0]) {
        $("#containerDivForLawyer").appendTo("#lawyerRep");
      }
      $("#lawyerRep").removeClass("is-hidden");
      $("#nonLawyerRep").addClass("is-hidden");
      $("#selfRep").addClass("is-hidden");
      $("#indNLAuthoritySection").addClass("is-hidden");
      $("#indNLECommsSection").addClass("is-hidden");
      $("#indLAuthoritySection").removeClass("is-hidden");
      $("#indLECommsSection").removeClass("is-hidden");
      $("#indNLNationality").val("");
    } else if (result === "non-lawyer") {
      if (!$("#nonLawyerRep").children()[0]) {
        $("#containerDivForNonLawyer").appendTo("#nonLawyerRep");
      }
      if ($("#indNLEmployedLYes").prop("checked", true)) {
        $("#indNLEmployedLYes").prop("checked", false);
      }
      $("#NLAuthorityAlertImage").removeClass("is-hidden");
      $("#nonLawyerRep").removeClass("is-hidden");
      $("#lawyerRep").addClass("is-hidden");
      $("#selfRep").addClass("is-hidden");
      $("#indNLAuthoritySection").removeClass("is-hidden");
      $("#indNLECommsSection").removeClass("is-hidden");
      $("#indLNationality").val("");
      $("#indLAuthoritySection").addClass("is-hidden");
      $("#indLECommsSection").addClass("is-hidden");
    } else if (result === "selfRepresented") {
      $("#selfRep").removeClass("is-hidden");
      $("#reviewRepSelf").removeClass("is-hidden");
      $("#nonLawyerRep").addClass("is-hidden");
      $("#lawyerRep").addClass("is-hidden");
      $("#indLAuthoritySection").addClass("is-hidden");
      $("#indLECommsSection").addClass("is-hidden");
      $("#indNLAuthoritySection").addClass("is-hidden");
      $("#indNLECommsSection").addClass("is-hidden");
      $("#indNLNationality").val("");
      $("#indLNationality").val("");
    } else {
      console.log("check for bugs");
    }
  });
};

representativeTypeOption();

$("input[name='page3[indNLAuthorityQn]']").change(function () {
  result = this.value;

  if (result === "yes") {
    $("#indNLAuthorityYes").removeClass("is-hidden");
    $("#indNLAuthorityNo").addClass("is-hidden");
    $("#indNLAuthArea").val("");
  } else {
    $("#indNLAuthorityYes").addClass("is-hidden");
    $("#indNLAuthorityNo").removeClass("is-hidden");
    $("#indNLAutorityYesCheckbox").prop("checked", false);
  }
});

$("input[name='page3[indNLEmployedL]']").change(function () {
  result = this.value;
  if (result === "yes") {
    $("#containerDivForLawyer").appendTo("#NLdivForAppendL");
    $("#NLEmployedLNoTextDiv").addClass("is-hidden");
  } else {
    $("#NLEmployedLNoTextDiv").removeClass("is-hidden");
    $("#containerDivForLawyer").appendTo("#lawyerRep");
  }
});

$("input[name='page3[indLAuthorityPower]']").change(function () {
  result = this.value;
  if (result === "Yes") {
    $("#indLAuthorityPowerYesDiv").removeClass("is-hidden");
    $("#LotherNL").addClass("is-hidden");
    $("#indLAuthorityPowerNoDiv").addClass("is-hidden");
    $("#containerDivForNonLawyer").appendTo("#nonLawyerRep");
  } else {
    $("#LotherNL").removeClass("is-hidden");
    $("#indLAuthorityPowerNoDiv").removeClass("is-hidden");
    $("#indLAuthorityPowerYesDiv").addClass("is-hidden");
  }
});

$("input[name='page3[LotherNL]']").change(function () {
  var result = this.value;
  if (result === "yes") {
    $("#containerDivForNonLawyer").appendTo("#LdivForAppendNL");
    $("#indLOtherYes").removeClass("is-hidden");
    $("#indLOtherNo").addClass("is-hidden");
  } else {
    $("#containerDivForNonLawyer").appendTo("#nonLawyerRep");
    $("#indLOtherNo").removeClass("is-hidden");
    $("#indLOtherYes").addClass("is-hidden");
  }
});

var orgRespresentativeOptions = function () {
  $("input[name='page3[orgRepresentativeType]']").change(function () {
    result = this.value;
    var messageText = document.getElementById("orgRepresentNoLawyer");
    if (result === "orgYesLawyer") {
      $("#orgRepresentNoLawyer").empty();
      $("#orgLawyerRep").removeClass("is-hidden");
      $(".orgAuthority").removeClass("is-hidden");
      $("#ifOrgLawyerYes").removeClass("is-hidden");
    } else if (result === "orgNoLawyer") {
      $("#orgLawyerRep").addClass("is-hidden");
      $(".orgAuthority").addClass("is-hidden");
      $("#ifOrgLawyerYes").addClass("is-hidden");
      $("#orglNationality").val("");
      messageText.innerHTML =
        "<h5>Even though you do not need a lawyer at this stage, if/when the application enters a judicial stage and hearings of the case are scheduled, the Court will expect you to be represented by a trained lawyer. Depending on the particularities of the application, it might take up to several years until the application enters the judicial phase and hearings are scheduled. The Court will inform you if this is the case and if you need to contract a lawyer. If you wish to represent yourself in the Chamber hearings or you do not afford a lawyer, the President of the Chamber may offer special dispensation for you to present your own case in accordance to <a href='https://echr.coe.int/Pages/home.aspx?p=basictexts/rules&c=' target='_blank'>Rule 36</a>, or you may be granted free legal aid in the conditions specified by <a href='https://echr.coe.int/Pages/home.aspx?p=basictexts/rules&c=' target='_blank'>Rule 105</a> (former Rule 100).</h5>";
      messageText.style.textAlign = "justify";
      $("#orgRepresentNoLawyer");
    } else {
      console.log("check for bugs");
    }
  });
};
orgRespresentativeOptions();

$("input[name='page3[orgOffEntitled]']").change(function () {
  var result = this.value;
  var answerArea = document.getElementById("orgOfficialAreaDiv");
  var popUpText = document.createElement("div");
  popUpText.style.textAlign = "justify";
  if (result === "yes") {
    if (answerArea.children.length != 0) {
      $(answerArea).empty();
    }
    popUpText.innerHTML =
      "<h5>Thank you, we have added the title of this document to the list of supporting documents on page 8. Please make sure to fill in the number of pages and the release date of this document on Page 8 (Supporting Documents) of this application form and to add a copy of the document as an attachment to the application form before you mail it to the Court.</h5>";
    popUpText.append(document.createElement("br"));
    answerArea.append(popUpText);
  } else {
    if (answerArea.children.length != 0) {
      $(answerArea).empty();
    }
    popUpText.innerHTML =
      "<h5>If you do not have a document proving the organisation official is legally entitled to represent the organisation, you must provide an explanation as to why this document is missing. <br/> Write your explanation in the field below. You should support your explanation by adding any other relevant document(s). When you complete filling in the digital application, we will generate an annex with this document containing your explanation as to why you cannot provide a document verifying the capacity/function of the organisation official. This document will be automatically listed on Page 8 (Supporting Documents) of this form. When you print out the application and the attachment, please remember to include this document as an attachment, together with any other documents that support your explanation as to why an official document proving the capacity/function of the organisation official is missing.</h5>";
    popUpText.append(document.createElement("br"));
    orgNLoffTextarea = document.createElement("textarea");
    orgNLoffTextarea.classList.add("form-control", "newPageTextArea");
    orgNLoffTextarea.id = "orgNLOfficialAreaNo";
    orgNLoffTextarea.addEventListener("input", function () {
      this.style.height = "";
      this.style.height = this.scrollHeight + "px";
    });
    popUpText.append(orgNLoffTextarea);
    popUpText.append(document.createElement("br"));
    answerArea.append(popUpText);
  }
});

//orgLAuthorityYes
// orgAttorneyAreaDiv
$("input[name='page3[orgAttorney]']").change(function () {
  var result = this.value;
  if (result === "yes") {
    $("#orgLAuthorityYes").removeClass("is-hidden");
    $("#orgAttorneyAreaDiv").addClass("is-hidden");
  } else {
    $("#orgAttorneyAreaDiv").removeClass("is-hidden");
    $("#orgLAuthorityYes").addClass("is-hidden");
  }
});
//
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
  beforeDelete: function (element) {
    var leftDeletedValue =
      element.children()[0].children[0].children[0].children[0].children[1]
        .value;
    var rightDeletedValue =
      element.children()[0].children[0].children[0].children[1].children[1]
        .value;
    limitLinesPage6 =
      limitLinesPage6 +
      Math.max(
        leftDeletedValue.split("\n").length,
        rightDeletedValue.split("\n").length
      );
    earlierLinesCountPage6 =
      earlierLinesCountPage6 -
      Math.max(
        leftDeletedValue.split("\n").length,
        rightDeletedValue.split("\n").length
      );
  },
});

// Page 5 add button limit warning
const page5AddButtonLimitWarning = (currentElement) => {
  if (currentElement.disabled) {
    Swal.fire("", "Not enough lines remaining to add another field.");
  }
  // if (linesRemaining < 5) {
  //   Swal.fire("Not enough lines remaining to add another field.");
  // }
};
// Page 5 add button limit warning end

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
  // beforeAdd: function () {
  //   const addButtonList = [...document.querySelectorAll(".page5_addButton")];
  //   addButtonList.map((addButtonElement) => {
  //     addButtonElement.addEventListener("click", page5AddButtonLimitWarning);
  //   });
  // },
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
    const lastGroupAddButton = [
      ...document.getElementById("page5Group").children,
    ]
      .pop()
      .querySelector(".page5GroupButtonsDiv")
      .querySelector(".page5_addButton");
    if (lastGroupAddButton.classList.contains("is-hidden")) {
      lastGroupAddButton.classList.remove("is-hidden");
    }
  },
  beforeDelete: function (element) {
    const leftDeletedValue = element[0].querySelector(".articleSelect").value;
    const rightDeletedValue = element[0].querySelector(
      ".articleExplanation"
    ).value;
    limitLinesPage5 =
      limitLinesPage5 +
      Math.max(
        leftDeletedValue.split("\n").length,
        rightDeletedValue.split("\n").length
      );
    earlierLinesCount =
      earlierLinesCount -
      Math.max(
        leftDeletedValue.split("\n").length,
        rightDeletedValue.split("\n").length
      );

    // for removal of selected Element's value from page 6 on removal of input group on page 5
    getDeletingElementIdNumber = element[0]
      .querySelector(".articleSelect")
      .id.split("_")[1];
    correspondingAddButton =
      "#addButton_6_" + String(getDeletingElementIdNumber);
    $(correspondingAddButton).siblings()[0].click();
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

function pageCountAnon(id) {
  lines = $(id).val();
  pageCount = 0;
  numOfLines = lines.split("\n").length - 1;
  if (numOfLines <= 45) {
    pageCount = 1;
  } else {
    pageCount = 1 + Math.ceil((numOfLines - 45) / 56);
  }
  return pageCount;
}

var globalDocObject = [];
let autoAddedDocs = [];
let manualAddedDocs = [];
let autoGenFlag = "auto";
// var docObject;

$("#docCreateTrigger, #stepperFormTrigger8").on("click", function () {
  docObject = [];
  if (!!$("#anonReqText").val()) {
    anon = {
      id: 1,
      date: moment().format("DD-MM-YYYY"),
      title: "Anonymity Request",
      desc: "Documents requesting anonymity in the public documents of the court.",
      page: 1,
      text: $("#anonReqText").val(),
    };
    docObject.push(anon);
  }
  if (!!$("#stofFactsExtra").val()) {
    facts = {
      id: 2,
      date: moment().format("DD-MM-YYYY"),
      title: "Supplementary Statement on the Subject matter of the application",
      desc: "Document to supplement further details on the facts.",
      page: 1,
      text: $("#stofFactsExtra").val(),
    };
    docObject.push(facts);
  }
  if ($("#orgOffEntitledYes").is(":checked")) {
    official = {
      id: 3,
      date: moment().format("DD-MM-YYYY"),
      title: "Proof of organisation official",
      desc: "Proof of the official's right to represent the organisation.",
      page: 1,
      text: "",
    };
    docObject.push(official);
  }

  if (!!$("#orgDateNoArea").val()) {
    orgDateText = {
      id: 4,
      date: moment().format("DD-MM-YYYY"),
      title: "Explanation for missing registration/incorporation date",
      desc: "Organisation does not possess a registration/incorporation date.",
      page: 1,
      text: $("#orgDateNoArea").val(),
    };
    docObject.push(orgDateText);
  }
  if (!!$("#orgIdentityNoArea").val()) {
    orgIdentityText = {
      id: 5,
      date: moment().format("DD-MM-YYYY"),
      title: "Explanation for missing identification number.",
      desc: "Organisation does not possess an identification number.",
      page: 1,
      text: $("#orgIdentityNoArea").val(),
    };
    docObject.push(orgIdentityText);
  }
  if (!!$("#indNLAuthArea").val()) {
    indNLAuthText = {
      id: 6,
      date: moment().format("DD-MM-YYYY"),
      title: "Explanation for lack of authority form",
      desc: "Document explaining the lack of authority form.",
      page: 1,
      text: $("#indNLAuthArea").val(),
    };
    docObject.push(indNLAuthText);
  }

  if ($("#indNLFaxOption:checked").val() === "No") {
    indNLFaxText = {
      id: 7,
      date: moment().format("DD-MM-YYYY"),
      title: "Non-lawyer representative missing fax number",
      desc: "Explanation for missing fax number (non-lawyer representative)",
      page: 1,
      text: $("#indNLFaxArea").val(),
    };
    docObject.push(indNLFaxText);
  }

  if ($("#indLFaxOption:checked").val() === "No") {
    indLFaxText = {
      id: 8,
      date: moment().format("DD-MM-YYYY"),
      title: "Lawyer representative missing fax number",
      desc: "Explanation for missing fax number (lawyer representative)",
      page: 1,
      text: $("#indLFaxArea").val(),
    };
    docObject.push(indLFaxText);
  }

  // if (!!$("#indLAuthAreaYes").val()) {
  //   indLOtherYesText = {
  //     id: 9,
  //     date: moment().format("DD-MM-YYYY"),
  //     title: "Explanation for lack of signature on the authority form",
  //     desc: "Document explaining the lack of authority form.",
  //     page: 1,
  //     text: $("#indLAuthAreaYes").val(),
  //   };
  //   docObject.push(indLOtherYesText);
  // }
  if (!!$("#indLAuthAreaNo").val()) {
    indLOtherNoText = {
      id: 10,
      date: moment().format("DD-MM-YYYY"),
      title: "Explanation for lack of signature on the authority form",
      desc: "Document explaining the lack of authority form. ",
      page: 1,
      text: $("#indLAuthAreaNo").val(),
    };
    docObject.push(indLOtherNoText);
  }
  if ($("#orgNLFaxOption:checked").val() === "on") {
    orgNLFaxText = {
      id: 11,
      date: moment().format("DD-MM-YYYY"),
      title: "Organisation official missing fax number",
      desc: "Document explaining why the organisation official cannot provide a fax number.",
      page: 1,
      text: $("#orgNLFaxArea").val(),
    };
    docObject.push(orgNLFaxText);
  }
  if ($("#orgNLFaxOption:checked").val() === "on") {
    orgNLFaxText = {
      id: 12,
      date: moment().format("DD-MM-YYYY"),
      title: "Organisation lawyer missing fax number",
      desc: "Document explaining why the organisation lawyer cannot provide a fax number.",
      page: 1,
      text: $("#orgLFaxArea").val(),
    };
    docObject.push(orgNLFaxText);
  }
  if (
    $("#orgOffEntitledNo").is(":checked") &&
    !!$("#orgNLOfficialAreaNo").val()
  ) {
    orgNLOfficial = {
      id: 13,
      date: moment().format("DD-MM-YYYY"),
      title: "Organisation official document",
      desc: "organisation official cannot provide proof for its position",
      page: 1,
      text: $("#orgNLOfficialAreaNo").val(),
    };
    docObject.push(orgNLOfficial);
  }

  if (!!$("#orgAutorityAreaNo").val()) {
    orgAutorityAreaNo = {
      id: 14,
      date: moment().format("DD-MM-YYYY"),
      title: "Explanation for lack of authority form",
      desc: "organisation cannot sign the form authorising the representative to represent",
      page: 1,
      text: $("#orgAutorityAreaNo").val(),
    };
    docObject.push(orgAutorityAreaNo);
  }
  // orgAutorityAreaNo

  $("input[name='page8[hiddenDocObject]']").val(JSON.stringify(docObject));

  document.getElementById("page8Spinner").style.display = "block";
  document.getElementById("page8Group").style.display = "none";
  const csrftoken = getCookie("csrftoken");
  axios({
    method: "post",
    url: "/form/docObject",
    data: { docObject: docObject },
    headers: {
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      const docObject = response.data;
      const docObjectLength = docObject.length;

      for (let i = 0; i < docObjectLength; i++) {
        if (
          $("#page8Group").children().length === 1 ||
          $("#page8Group").children().last().find(".docsDate").val() != ""
        ) {
          if ($("#page8Group").children().length < docObjectLength) {
            $(`#addButton_8_${i - 1}`).click();
          }
          inputPage8Values(i, docObject);
        } else if (
          $("#page8Group").children().length != 1 ||
          $("#page8Group").children().last().find(".docsDate").val() === ""
        ) {
          inputPage8Values(i, docObject);
        }

        // hide button div of 2nd last group
        $("#page8Group")
          .children("div:nth-last-child(2)")
          .children("div")
          .addClass("is-hidden");
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      document.getElementById("page8Spinner").style.display = "none";
      document.getElementById("page8Group").style.display = "block";
    });

  // var docObjectLength = docObject.length;

  // check fields empty or not for delete button hiding for auto documents
});

// const firstPageNumberLabelElement =

const popover_attributes = {
  content: "Indicate the total number of pages in each document",
  trigger: "click",
  placement: "bottom",
  theme: "light",
};
document.getElementsByClassName("popover-class")[0].id = "first-popover";
tippy("#first-popover", popover_attributes);
document.getElementsByClassName("popover-class")[0].id = "";

var inputPage8Values = function (i, docObject) {
  $(`input[name='page8[${i}][date]']`).val(docObject[i].date);
  $(`input[name='page8[${i}][title]']`).val(docObject[i].title);
  $(`input[name='page8[${i}][desc]']`).val(docObject[i].desc);
  $(`input[name='page8[${i}][page]']`).val(docObject[i].page);
};

$("#page8Group").repeater({
  btnAddClass: "r-btnAdd",
  btnRemoveClass: "r-btnRemove",
  groupClass: "r-group",
  minItems: 1,
  maxItems: 24 - $("#page8DocsCreated").find("ul").children().length,
  startingIndex: 0,
  showMinItemsOnLoad: true,
  reindexOnDelete: true,
  repeatMode: "append",
  animation: "fade",
  animationSpeed: 400,
  animationEasing: "swing",
  clearValues: true,
  afterAdd: function () {
    var container =
      $(".bootstrap-iso form").length > 0
        ? $(".bootstrap-iso form").parent()
        : "body";
    $(".datepicker").datepicker({
      autoclose: true,
      container: container,
      startDate: "01-01-1900",
      orientation: "auto",
      format: "dd-mm-yyyy",
      weekStart: 1,
      language: "en",
      daysOfWeekHighlighted: "0,6",
      showOnFocus: true,
      maxViewMode: "centuries",
      templates: {
        leftArrow: '<i class="fas fa-angle-double-left"></i>',
        rightArrow: '<i class="fas fa-angle-double-right"></i>',
      },
      assumeNearbyYear: true,
      calendarWeeks: false,
      clearBtn: true,
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
    document.getElementsByClassName("popover-class")[0].id = "";
    console.log(`doc_${parseInt(this.id.split("_")[2]) + 1}_page`);
    const x = document
      .getElementById(`doc_${parseInt(this.id.split("_")[2]) + 1}_page`)
      .closest("th")
      .querySelector("a");
    tippy(x, popover_attributes);
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

  if (input.createRange) {
    var range = input.createRange();
    range.collapse(true);
    range.moveEnd("character", selectionEnd);
    range.moveStart("character", selectionStart);
    range.select();
  } else if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }

  //   return this;
};

$("#stofFacts").textcounter({
  type: "character",
  max: "auto",
  countSpaces: true,
  countDown: true,
  countDownText: "Characters Remaining: %d",
  countExtendedCharacters: true,
});

$("#stofFacts").on("input", function () {
  var popUpStFactText = document.createElement("div");
  popUpStFactText.style.textAlign = "justify";
  popUpStFactText.innerHTML =
    "You have reached the page limit imposed by the Court. It is possible for you to add a supplementary statement expanding on the facts, complaints or remedies used. This extra statement should not be more than 20 pages. It should not add new complaints or violations but only develop what is already set out in the form. <br/>You can either cancel and rephrase your Statement of the facts to comply with the page limit, or you can add extra pages on the Subject matter of the application. Before adding extra pages, make sure that all the central facts are already mentioned in the main Statement of Facts and that you are not adding any additional information, but merely expanding on the already mentioned facts, violations and complaints.";
  if ($(this).val().length >= $(this)[0].maxLength) {
    Swal.fire({
      showConfirmButton: true,
      confirmButtonText: "Add Supplementary Statement",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      html: popUpStFactText,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      padding: "4rem 1.5rem 3rem 1.5rem",
      width: "60rem",
    }).then(function (result) {
      if (result.isConfirmed) {
        $("#extraWritingArea").removeClass("is-hidden");
      }
    });
  }
});

$("#deleteSupButton").on("click", function () {
  var popUpDelSupplementary = document.createElement("div");
  popUpDelSupplementary.style.textAlign = "justify";
  popUpDelSupplementary.innerHTML =
    "Are you sure you want to delete the Supplementary statement?";
  Swal.fire({
    showConfirmButton: true,
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No",
    html: popUpDelSupplementary,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    padding: "4rem 1.5rem 3rem 1.5rem",
    width: "60rem",
  }).then(function (result) {
    if (result.isConfirmed) {
      $("#extraWritingArea").addClass("is-hidden");
      $("#stofFactsExtra").val("");
    }
  });
});

$("#stofFactsExtra").textcounter({
  type: "character",
  max: "auto",
  countSpaces: true,
  countDown: true,
  countDownText: "Characters Remaining: %d",
  countExtendedCharacters: true,
});

limitLines3 = function (textarea) {
  setTimeout(function () {
    var limit = textarea.getAttribute("rows");
    var spaces = textarea.getAttribute("cols");
    var lines = textarea.value.split("\n");

    for (var i = 0; i < lines.length && i < limit; i++) {
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
      lines[i] = lines[i].substring(0, space + 1);
    }

    if (lines.length > limit) {
      textarea.style.color = "red";
      setTimeout(function () {
        textarea.style.color = "";
      }, 500);
      p = lines.slice(0, limit).join("\n");
      p = p.substring(0, p.length) + "\n" + p.substring(p.length);
      textarea.value = p.split("\n").slice(0, limit).join("\n");
    }
    // if (lines.length > limit && (event.keyCode != 8 || event.keyCode != 46)) {
    //   textarea.value = lines.slice(0, limit).join("\n");
    //   return;
    // }
    idTextArea = "#" + String(textarea.id);
    var cursorPosition = $(idTextArea).prop("selectionStart");

    $(idTextArea).setCursorPosition(cursorPosition);

    if (textarea.classList.contains("lastAreas")) {
      textarea.parentElement.parentElement.children[2].innerHTML =
        "Lines Remaining: " + String(limit - lines.length);
    } else {
      textarea.nextElementSibling.innerHTML =
        "Lines Remaining: " + String(limit - lines.length);
    }
  }, 0);
};

function limitLines2(element, limitRow, onPaste) {
  setTimeout(function () {
    var cursorPosition = {
      value: $(element).prop("selectionStart"),
    };
    limitCol = element.cols;
    rem = limitRow;
    if (!onPaste) {
      formattedText = formatTextWithoutDash(
        element.value,
        limitCol,
        cursorPosition,
        limitRow,
        element
      );
    } else {
      // do something with text

      formattedText = onPasteformatTextWithoutDash($(element).val(), limitCol);
    }
    rem = rem - formattedText.split("\n").length;
    if (rem < 0) {
      element.style.color = "red";
      setTimeout(function () {
        element.style.color = "";
      }, 500);
      // element.value = trimLastNthCharInString(
      //   formattedText,
      //   "\n",
      //   Math.abs(rem) - 1
      // );

      element.value = formattedText.split("\n").slice(0, limitRow).join("\n");
      $(element).setCursorPosition(cursorPosition);
    } else {
      element.value = formattedText;
    }
    $(element).setCursorPosition(cursorPosition.value);
  }, 0);
}

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
      nameValue = $("textarea[name='page2[orgName]']").val();
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
        Swal.fire("", "No representative entered in Page 3");
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
        Swal.fire("", "Problem in page 3 organisation representative");
      }
    }
    $("#confirmationRepresentativeName").val(nameValue);
    $("#confirmationRepresentativeAddress").val(addressValue);
  } else {
    Swal.fire("", "check for error");
  }
});

// Page 9 signature accuracy section
$("input[name='page9[signAccuracyDeclaration]']").on("change", function () {
  $("#page9AlertAndImage").removeClass("is-hidden");
  if (
    $("input[name='page9[signAccuracyDeclaration]']:checked").val() ===
    "Applicant"
  ) {
    $("#page9imageApplicantChecked").removeClass("is-hidden");
    $("#page9imageRepresentativeChecked").addClass("is-hidden");
  } else if (
    $("input[name='page9[signAccuracyDeclaration]']:checked").val() ===
    "Representative"
  ) {
    $("#page9imageApplicantChecked").addClass("is-hidden");
    $("#page9imageRepresentativeChecked").removeClass("is-hidden");
  } else {
    console.log("error in page 9 signature accuracy section");
  }
});

// end page 9

// Review page
$(".reviewButton").on("click", function () {
  $(this).children("i").toggleClass("fa-angle-down");
  $(this).children("i").toggleClass("fa-angle-right");
  $(this).children("p").toggleClass("is-hidden");
});
// Review page end

//  text format

function formatTextWithoutDash(
  lines,
  colLimit,
  cursorPosition,
  rowLimit,
  element
) {
  var limitCount = colLimit;
  var wordStartPos = 0;
  var strg = "";
  var itrPosition = 0;
  for (var i = 0; i < lines.length; i++) {
    ch = lines[i];
    limitCount -= 1;
    itrPosition += 1;
    strg += ch;
    if (ch == "\n") {
      if (lines.split("\n").length > rowLimit) {
        // strg =
        //   strg.slice(0, cursorPosition.value - 1) +
        //   strg.slice(cursorPosition.value);
        // itrPosition -= 1;
        // element.style.color = "red";
        // setTimeout(function () {
        //   element.style.color = "";
        // }, 500);
      }
      limitCount = colLimit;
      continue;
    }

    if (limitCount == 0) {
      if (ch != " ") {
        if (lines.split("\n").length < rowLimit) {
          strg = strg.slice(0, wordStartPos) + "\n" + strg.slice(wordStartPos); // strg[:wordStartPos] + "\n" + strg[wordStartPos:]

          limitCount = colLimit - (itrPosition - wordStartPos);
          itrPosition += 1;

          if (i < lines.length && cursorPosition != null) {
            cursorPosition.value += 1;
          }
        } else {
          strg =
            strg.slice(0, cursorPosition.value - 1) +
            strg.slice(cursorPosition.value);
          limitCount = colLimit;
          itrPosition += 1;
          element.style.color = "red";
          setTimeout(function () {
            element.style.color = "";
          }, 500);
          cursorPosition.value -= 1;
        }
      } else {
        if (lines.split("\n").length < rowLimit) {
          if (i + 1 != lines.length && lines[i + 1] != "\n") {
            strg = strg.slice(0, itrPosition) + "\n" + strg.slice(itrPosition);

            limitCount = colLimit;
            itrPosition += 1;
            if (i < lines.length && cursorPosition != null)
              cursorPosition.value += 1;
          }
        } else {
          strg =
            strg.slice(0, cursorPosition.value - 1) +
            strg.slice(cursorPosition.value);
          limitCount = colLimit;
          itrPosition += 1;
          element.style.color = "red";
          setTimeout(function () {
            element.style.color = "";
          }, 500);
          cursorPosition.value -= 1;
        }
      }
    }
    if (ch == " ") {
      wordStartPos = itrPosition;
    }
  }
  return strg;
}

function onPasteformatTextWithoutDash(lines, colLimit) {
  var limitCount = colLimit;
  var wordStartPos = 0;
  var strg = "";
  var itrPosition = 0;

  for (var i = 0; i < lines.length; i++) {
    ch = lines[i];
    limitCount -= 1;
    itrPosition += 1;
    strg += ch;
    if (ch == "\n") {
      limitCount = colLimit;
      continue;
    }

    if (limitCount == 0) {
      if (ch != " ") {
        strg = strg.slice(0, wordStartPos) + "\n" + strg.slice(wordStartPos); // strg[:wordStartPos] + "\n" + strg[wordStartPos:]

        limitCount = colLimit - (itrPosition - wordStartPos);
        itrPosition += 1;
      } else {
        if (i + 1 != lines.length && lines[i + 1] != "\n") {
          strg = strg.slice(0, itrPosition) + "\n" + strg.slice(itrPosition);
          limitCount = colLimit;
          itrPosition += 1;
        }
      }
    }
    if (ch == " ") {
      wordStartPos = itrPosition;
    }
  }
  return strg;
}

function formatText(lines, limit, suffixLen = 3, prefixLen = 2) {
  str = "";
  itrPosition = 0;

  limitCount = limit;
  flag = 0;
  inWordPos = 0;
  wordPrefix = 0;
  wordSuffix = 0;
  wordStartPos = 0;
  for (var i = 0; i < lines.length; i++) {
    ch = lines[i];
    itrPosition += 1;
    str += ch;
    limitCount -= 1;

    if (ch == "\n") {
      if (flag == 1) {
        wordSuffix = itrPosition - inWordPos;
        str = str.slice(0, wordStartPos) + "\n" + str.slice(wordStartPos); // str[:wordStartPos] + "\n" + str[wordStartPos:]
        limitCount = limit - (wordPrefix + wordSuffix);
        flag = 0;
        continue;
      } else {
        limitCount = limit;
        flag = 0;
        wordStartPos = itrPosition;
      }
    }
    if (flag == 1) {
      wordSuffix = itrPosition - inWordPos;
      if (wordSuffix >= suffixLen && ch != " ") {
        flag = 0;
        str = str.slice(0, inWordPos) + "-\n" + str.slice(inWordPos); //str[:inWordPos] + "-\n" + str[inWordPos:]
        itrPosition += "-\n".length;
        limitCount = limit - wordSuffix;
        wordStartPos = inWordPos + "-\n".length;
        continue;
      } else if (wordSuffix <= suffixLen && ch == " ") {
        str = str.slice(0, wordStartPos) + "\n" + str.slice(wordStartPos); //str[:wordStartPos] + "\n" + str[wordStartPos:]
        flag = 0;
        itrPosition += "\n".length;
        limitCount = limit - (wordSuffix + wordPrefix);
        continue;
      }
    }
    if (ch == " ") {
      wordStartPos = itrPosition;
    }
    if (limitCount == 0) {
      if (ch != " ") {
        inWordPos = itrPosition;
        wordPrefix = inWordPos - wordStartPos;
        if (wordPrefix <= prefixLen) {
          str = str.slice(0, wordStartPos) + "\n" + str.slice(wordStartPos); //str[:wordStartPos] + "\n" + str[wordStartPos:]
          limitCount = limit - wordPrefix;
          itrPosition += 1;
          wordStartPos += 1;
        } else {
          flag = 1;
          limitCount = limit;
        }
      } else {
        str = str.slice(0, itrPosition) + "\n" + str.slice(itrPosition); //str[:itrPosition] + "\n" + str[itrPosition:]
        limitCount = limit;
        itrPosition += 1;
        wordStartPos += 1;
      }
    }
  }
  if (flag == 1) {
    str = str.slice(0, wordStartPos) + "\n" + str.slice(wordStartPos); //str[:wordStartPos] + "\n" + str[wordStartPos:]
  }
  return str;
}

limitLinesPage5 = 108;
earlierLinesCount = 0;

function articleWrapper(
  element,
  columnLength,
  isArticleSelectElement,
  isPaste
) {
  const repeaterParentElement = element.closest("#page5Group").children;
  otherElementIndex = 0;
  if (isArticleSelectElement) {
    otherElementIndex = 2;
  }

  const invisibleArticleArea = element
    .closest("tr")
    .querySelector(".articleArea");
  const otherElement =
    otherElementIndex === 0
      ? element.closest("tr").querySelector(".articleExplanation")
      : element.closest("tr").querySelector(".articleSelect");

  idTextArea = "#" + String(element.id);
  var cursorPosition = $(idTextArea).prop("selectionStart");
  var text = element.value;
  if (otherElementIndex === 2) text = conjunctionValueIfExists(element);
  var colLimit = columnLength;
  var rowLimit =
    Math.max(otherElement.value.split("\n").length, text.split("\n").length) +
    limitLinesPage5;
  var posInfo = getPosInfo(text, cursorPosition - 1, colLimit);
  var relPos = posInfo.rel_pos;
  var overFlowInfo = null;
  var isExceeded = false;
  // if (isArticleSelectElement) {
  //   otherElement.removeAttribute("disabled");
  // }

  // format firstElement
  if (isPaste || isArticleSelectElement) {
    if (isArticleSelectElement) {
      invisibleArticleArea.value = text;
      rowLimit = otherElement.value.split("\n").length + limitLinesPage5;
      limitLinesOnPaste(invisibleArticleArea, rowLimit, colLimit);
      resultString1 = invisibleArticleArea.value
        .split("\n")
        .slice(0, rowLimit)
        .join("\n");
    } else {
      limitLinesOnPaste(element, rowLimit, colLimit);
      resultString1 = element.value.split("\n").slice(0, rowLimit).join("\n");
    }
  } else {
    if (
      text.split("\n").length >= rowLimit &&
      text[cursorPosition - 1] == "\n"
    ) {
      resultString1 =
        text.substring(0, cursorPosition - 1) +
        text.substring(cursorPosition, text.length);
      isExceeded = true;
    } else {
      overFlowInfo = checkOverflow(
        text,
        cursorPosition - 1,
        posInfo,
        colLimit,
        rowLimit
      );

      if (
        overFlowInfo.overflow == false &&
        overFlowInfo.formatted_text.split("\n").length <= rowLimit
      ) {
        if (checkIfNewLine(text, cursorPosition - 1, relPos, colLimit)) {
          cursorPosition += 1;
        }
        resultString1 = overFlowInfo.formatted_text
          .split("\n")
          .slice(0, rowLimit)
          .join("\n");
      } else {
        resultString1 = removeCharAt(text, cursorPosition - 1);
        isExceeded = true;
      }
    }
  }
  if (isArticleSelectElement) {
    resultString2 = otherElement.value;
    invisibleArticleArea.value = resultString1;
  } else {
    resultString2 = invisibleArticleArea.value;
    element.value = resultString1;
    if (isExceeded) {
      $(idTextArea).setCursorPosition(cursorPosition - 1);
    } else {
      $(idTextArea).setCursorPosition(cursorPosition);
    }
  }
  var currentLineCount = 0;
  for (var i = 0; i < repeaterParentElement.length; i++) {
    var leftFieldValue =
      repeaterParentElement[i].children[1].children[0].children[0].children[1]
        .children[1].value;
    var rightFieldValue =
      repeaterParentElement[i].children[1].children[0].children[0].children[2]
        .children[1].value;

    if (i == repeaterParentElement.length - 1)
      currentLineCount += Math.max(
        leftFieldValue.split("\n").length,
        rightFieldValue.split("\n").length
      );
    else
      currentLineCount +=
        Math.max(
          leftFieldValue.split("\n").length,
          rightFieldValue.split("\n").length
        ) + 1;
  }

  if (earlierLinesCount < currentLineCount) {
    limitLinesPage5 = limitLinesPage5 - (currentLineCount - earlierLinesCount);
    earlierLinesCount = currentLineCount;
  } else if (earlierLinesCount > currentLineCount) {
    limitLinesPage5 += earlierLinesCount - currentLineCount;
    earlierLinesCount = currentLineCount;
  }

  if (isArticleSelectElement) {
    if (limitLinesPage5 < 0) {
      Swal.fire("", "Text exceeding line limit"); //popup that first element exceeding page
      element.selectedIndex = earlierSelected;
    }

    // set the formatted value to invisible text area

    earlierSelected = element.selectedIndex;
  } else {
    if (limitLinesPage5 < 0) {
      Swal.fire("", "Text exceeding line limit");
      element.style.color = "red";
      setTimeout(function () {
        element.style.color = "";
      }, 500);
    }
  }
  if (!isArticleSelectElement) {
    counterElement =
      element.parentElement.parentElement.children[2].children[3];
    var p =
      invisibleArticleArea.value.split("\n").length -
      element.value.split("\n").length;
    getCounterValue(counterElement, p);
    counterElement.classList.remove("is-hidden");
  }
}

function getCounterValue(element, p) {
  if (element.closest(".s-group")) {
    const counterElement = element
      .closest("tr")
      .querySelector(".remediesCounter ");
    limitLinesPage6 = limitLinesPage6 < 0 ? 0 : limitLinesPage6;
    var cnt = p >= 0 ? p + limitLinesPage6 : limitLinesPage6;
    counterElement.innerHTML = "Lines Remaining: " + cnt;
    counterElement.classList.remove("is-hidden");
  } else {
    const counterElement = element
      .closest("tr")
      .querySelector(".explanationCounter");
    limitLinesPage5 = limitLinesPage5 < 0 ? 0 : limitLinesPage5;
    if (limitLinesPage5 > 4) {
      element
        .closest(".a-group")
        .querySelector(".addButtonWarningDiv")
        .classList.add("is-hidden");
      toggleAddButton(element, false);
    } else {
      element
        .closest(".a-group")
        .querySelector(".addButtonWarningDiv")
        .classList.remove("is-hidden");
      toggleAddButton(element, true);
    }
    var cnt = p >= 0 ? p + limitLinesPage5 : limitLinesPage5;
    counterElement.innerHTML = "Lines Remaining: " + cnt;
    counterElement.classList.remove("is-hidden");
  }
}

function hideCounterElement(element) {
  if (
    element.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains(
      "s-group"
    )
  ) {
    counterElement = element.closest("tr").querySelector(".remediesCounter");
    counterElement.innerHTML = "Lines Remaining: " + limitLinesPage6;
    counterElement.classList.add("is-hidden");
  } else {
    counterElement =
      element.parentElement.parentElement.children[2].children[2];
    counterElement.classList.add("is-hidden");
  }
}
var trimLastNthCharInString = function (str, ch, n) {
  finalStr = "";
  var cnt = 0;
  for (var i = str.length - 1; i >= 0; i--) {
    if (str[i] === ch) {
      cnt++;
      if (cnt === n + 1) {
        finalStr = str.substr(0, i);
        return finalStr;
      }
    }
  }
  return str;
};

function toggleAddButton(element, toggleValue) {
  parentElement =
    element.parentElement.parentElement.parentElement.parentElement
      .parentElement.children[3].children[0];
  parentElement.disabled = toggleValue;
}

// Complaint Page processing

limitLinesPage6 = 51;
// limitLinesPage6 = 5;
earlierLinesCountPage6 = 0;

function isArrowKey(e) {
  var keyCode = e.keyCode;
  if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
    return true;
  return false;
}

function isSelected(element) {
  var st = element.selectionStart;
  var end = element.selectionEnd;
  if (st != end && end > st) return true;
  return false;
}

function complaintKeyDown(event, element) {
  var getSelectedText =
    element.parentElement.parentElement.children[0].children[1].value;

  var fixedText = getSelectedText;

  idTextArea = "#" + String(element.id);
  var cursorPosition = $(idTextArea).prop("selectionStart");

  if (element.value.startsWith(fixedText)) {
    if (cursorPosition == fixedText.length && event.keyCode == 8) {
      if (!isSelected(element)) {
        event.preventDefault();
        $(idTextArea).setCursorPosition(cursorPosition);
      }

      return false;
    }
    if (cursorPosition < fixedText.length) {
      if (isArrowKey(event)) return true;
      event.preventDefault();
      cursorPosition = fixedText.length;
      $(idTextArea).setCursorPosition(cursorPosition);
      return false;
    }
  }
  return true;
}

function complaintWrapper(
  element,
  columnLength,
  isComplaintInputElement,
  isPaste
) {
  idTextArea = "#" + String(element.id);
  var cursorPosition = $(idTextArea).prop("selectionStart");

  // if (cursorPosition >= fixedText.length) {
  var getSelectedText =
    element.parentElement.parentElement.children[0].children[1].value;

  // format fixed text
  var fixedText = getSelectedText;

  if (isComplaintInputElement && !element.value.startsWith(fixedText)) {
    element.value = fixedText + element.value;
    cursorPosition = fixedText.length + 1;
  }

  repeaterParentElement =
    element.parentElement.parentElement.parentElement.parentElement
      .parentElement.parentElement.children;
  otherElementIndex = 1;
  if (isComplaintInputElement) {
    otherElementIndex = 2;
  }

  otherElement =
    element.parentElement.parentElement.children[otherElementIndex].children[1];

  var text = element.value;
  var colLimit = columnLength;
  var rowLimit =
    Math.max(otherElement.value.split("\n").length, text.split("\n").length) +
    limitLinesPage6;
  var posInfo = getPosInfo(text, cursorPosition - 1, colLimit);
  var relPos = posInfo.rel_pos;
  var overFlowInfo = null;
  var isExceeded = false;
  if (isPaste) {
    // console.log("GG");
    limitLinesOnPaste(element, rowLimit, colLimit);
    resultString1 = element.value.split("\n").slice(0, rowLimit).join("\n");
  } else {
    if (
      text.split("\n").length >= rowLimit &&
      text[cursorPosition - 1] == "\n"
    ) {
      resultString1 =
        text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
      isExceeded = true;
    } else {
      overFlowInfo = checkOverflow(
        text,
        cursorPosition - 1,
        posInfo,
        colLimit,
        rowLimit
      );

      if (
        overFlowInfo.overflow == false &&
        overFlowInfo.formatted_text.split("\n").length <= rowLimit
      ) {
        if (checkIfNewLine(text, cursorPosition - 1, relPos, colLimit)) {
          cursorPosition += 1;
          // console.log("YES");
        }
        resultString1 = overFlowInfo.formatted_text
          .split("\n")
          .slice(0, rowLimit)
          .join("\n");
      } else {
        resultString1 = removeCharAt(text, cursorPosition - 1);
        isExceeded = true;
      }
    }
  }
  // console.log(cursorPosition);

  resultString2 = otherElement.value;

  element.value = resultString1;

  var currentLineCount = 0;

  for (var i = 0; i < repeaterParentElement.length; i++) {
    var leftFieldValue =
      repeaterParentElement[i].children[0].children[0].children[0].children[1]
        .children[1].value;
    var rightFieldValue =
      repeaterParentElement[i].children[0].children[0].children[0].children[2]
        .children[1].value;
    if (i == repeaterParentElement.length - 1)
      currentLineCount += Math.max(
        leftFieldValue.split("\n").length,
        rightFieldValue.split("\n").length
      );
    else
      currentLineCount +=
        Math.max(
          leftFieldValue.split("\n").length,
          rightFieldValue.split("\n").length
        ) + 1;
  }
  if (earlierLinesCountPage6 < currentLineCount) {
    limitLinesPage6 =
      limitLinesPage6 - (currentLineCount - earlierLinesCountPage6);
    earlierLinesCountPage6 = currentLineCount;
  } else if (earlierLinesCountPage6 > currentLineCount) {
    limitLinesPage6 += earlierLinesCountPage6 - currentLineCount;
    earlierLinesCountPage6 = currentLineCount;
  }

  if (isComplaintInputElement) {
    if (limitLinesPage6 < 0) {
      Swal.fire("", "Text  exceedingline limit"); //popup that firstEt elemenxceeding page
      element.value = trimLastNthCharInString(
        resultString1,
        "\n",
        Math.abs(limitLinesPage6) - 1
      );
      element.style.color = "red";
      setTimeout(function () {
        element.style.color = "";
      }, 500);
    }
    // set the formatted value to invisible text area
  } else {
    if (limitLinesPage6 < 0) {
      Swal.fire("", "Text exceeding line limit");
      element.value = trimLastNthCharInString(
        resultString1,
        "\n",
        Math.abs(limitLinesPage6) - 1
      );

      element.style.color = "red";
      setTimeout(function () {
        element.style.color = "";
      }, 500);
    }
  }
  if (!isComplaintInputElement) {
    counterElement = element.closest("tr").querySelector(".remediesCounter");
    var p =
      otherElement.value.split("\n").length - element.value.split("\n").length;
    getCounterValue(counterElement, p);
    counterElement.classList.remove("is-hidden");
  }

  if (isExceeded) {
    // console.log("OK");
    $(idTextArea).setCursorPosition(cursorPosition - 1);
  } else {
    $(idTextArea).setCursorPosition(cursorPosition);
  }
}
//

limitLinesOnPaste = function (textarea, rows, cols) {
  setTimeout(function () {
    var limit = rows == null ? textarea.rows : rows;

    var spaces = cols == null ? textarea.cols : cols;
    idTextArea = "#" + String(textarea.id);
    var cursorPosition = $(idTextArea).prop("selectionStart");
    var lines = textarea.value.split("\n");
    var flag = false;

    for (var i = 0; i < lines.length && i < limit; i++) {
      if (lines[i].length <= spaces) continue;
      var j = 0;

      var space = spaces;

      while (j < spaces) {
        if (lines[i].charAt(j) === " ") space = j;
        j++;
      }

      lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
      lines[i] = lines[i].substring(0, space + 1);

      if (lines.length > limit) {
        flag = true;
        break;
      }
    }
    if (lines.length > limit) {
      textarea.style.color = "red";
      setTimeout(function () {
        textarea.style.color = "";
      }, 500);
    }
    // if (lines.length > limit && (event.keyCode != 8 || event.keyCode != 46)) {
    //   textarea.value = lines.slice(0, limit).join("\n");
    //   return;
    // }

    textarea.value = lines.slice(0, limit).join("\n");
    if (flag == true) {
      $(idTextArea).focus();
    } else {
      // console.log("LOL");
      $(idTextArea).setCursorPosition(cursorPosition + 2);
    }
  }, 0);
};

// new
var limitLines = function (textarea) {
  setTimeout(function () {
    idTextArea = "#" + String(textarea.id);
    var cursorPosition = $(idTextArea).prop("selectionStart");
    var overFlowInfo = null;
    var text = textarea.value;
    var colLimit = textarea.cols;
    var rowLimit = textarea.rows;
    posInfo = getPosInfo(text, cursorPosition - 1, colLimit);
    relPos = posInfo.rel_pos;

    overFlowInfo = checkOverflow(
      text,
      cursorPosition - 1,
      posInfo,
      colLimit,
      rowLimit
    );

    if (
      overFlowInfo.overflow == false &&
      overFlowInfo.formatted_text.split("\n").length <= rowLimit
    ) {
      if (checkIfNewLine(text, cursorPosition - 1, relPos, colLimit)) {
        cursorPosition += 1;
      }
      textarea.value = overFlowInfo.formatted_text
        .split("\n")
        .slice(0, rowLimit)
        .join("\n");
      $(idTextArea).setCursorPosition(cursorPosition);
    } else {
      textarea.value = removeCharAt(text, cursorPosition - 1);
    }
    currentTotalLine = (textarea.value.match(/\n/g) || []).length + 1;
    if (textarea.classList.contains("lastAreas")) {
      textarea.parentElement.parentElement.children[2].innerHTML =
        "Lines Remaining: " + String(rowLimit - currentTotalLine);
    } else {
      textarea.nextElementSibling.innerHTML =
        "Lines Remaining: " + String(rowLimit - currentTotalLine);
    }
  }, 0);
};

function removeStringFromLine(text, startPos, pastedLength) {
  return text.substring(0, startPos) + text.substring(startPos + pastedLength);
}

function checkIfNewLine(text, pos, relPos, colLimit) {
  // debugger;
  while (relPos < colLimit) {
    // console.log(text[pos]);
    if (text[pos] == " " || text[pos] == "\n") return false;
    relPos += 1;
    pos++;
  }

  return true;
}

function getPosInfo(text, pos, colLimit) {
  // assumption that line is formatted till pos
  var relPos = 0;
  var lastSpace = -1;
  var lines = 0;
  for (i = 0; i < pos; i++) {
    if (text[i] == " ") lastSpace = i;
    if (text[i] == "\n") {
      relPos = -1;
      lines++;
    }
    relPos++;
  }
  return {
    rel_pos: relPos,
    last_space: lastSpace,
    lines: lines,
  };
}

var checkOverflow = function (text, pos, posInfo, colLimit, rowLimit) {
  // checks overflow of each line
  // limit cases -
  // : if there is \n before colLimit
  // : if pos>text.length

  while (posInfo.rel_pos < colLimit && posInfo.lines < rowLimit) {
    if (text[pos] == "\n" || pos >= text.length) {
      return {
        overflow: false,
        formatted_text: text,
      };
    }
    if (text[pos] == " ") posInfo.last_space = pos;
    pos++;
    posInfo.rel_pos++;
  }
  posInfo.rel_pos = pos - posInfo.last_space;
  // check if \n leads to overflow
  text = insertCharAt(text, "\n", posInfo.last_space);
  posInfo.lines += 1;

  if (posInfo.lines >= rowLimit) {
    return {
      overflow: true,
      formatted_text: "",
    };
  }
  //check for extra \n
  j = pos + 1;
  while (j < text.length) {
    if (text[j] == "\n") {
      text = removeCharAt(text, j);
      break;
    }
    j++;
  }
  return checkOverflow(text, pos, posInfo, colLimit, rowLimit);
};

function insertCharAt(text, ch, pos) {
  return text.substring(0, pos + 1) + ch + text.substring(pos + 1);
}

function removeCharAt(text, pos) {
  return text.substring(0, pos) + text.substring(pos + 1);
}

function getCheckedArticleAttachedToNumber() {
  home = $(".inputOuter:checked").val();
  // return initialArticleString + " * ";
}

const conjunctionValueIfExists = (element) => {
  const mainSelectText = element.closest("tr").querySelector(".articleSelect");
  const conjArticleSelect = element
    .closest("tr")
    .querySelector(".secondSelectDiv > select");
  if (conjArticleSelect) {
    return `${mainSelectText.value} in conjunction with ${conjArticleSelect.value}`;
  }
  return `${mainSelectText.value}`;
};
