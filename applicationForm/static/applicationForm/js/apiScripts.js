// selects all child input checkboxes and applies the checked
// item of the one that has been clicked on

var descDiv = document.querySelector(".descDiv1");
descDiv.addEventListener("change", function (event) {
  // console.log(event);
  if (event.target.classList.value.includes("articleCheck")) {
    let checkboxes = document.querySelectorAll(".articleCheck");

    for (let x = 0; x < checkboxes.length; x++) {
      checkboxes[x].addEventListener("change", function (e) {
        let parentNode = this.parentNode;

        const cbDescendants = parentNode.querySelectorAll("input.articleCheck");
        for (let y = 0; y < cbDescendants.length; y++) {
          cbDescendants[y].checked = this.checked;
          cbDescendants[y].indeterminate = false;
        }

        while (["ul", "li"].indexOf(parentNode.nodeName.toLowerCase()) >= 0) {
          const mainCb = parentNode.querySelector(
            ":scope > input.articleCheck"
          );

          if (mainCb && mainCb != this) {
            mainCb.checked = this.checked;

            const mainCbChildren = mainCb.parentNode.querySelectorAll(
              ".articleCheck"
            );
            const numTotal = mainCbChildren.length;

            let numChecked = 0;
            for (let z = 0; z < mainCbChildren.length; z++) {
              numChecked += mainCbChildren[z].checked;
            }

            if (numTotal === numChecked) {
              mainCb.indeterminate = false;
              mainCb.checked = true;
            } else {
              if (numChecked === 0) {
                mainCb.indeterminate = false;
                mainCb.checked = false;
              } else {
                mainCb.indeterminate = true;
                mainCb.checked = false;
              }
            }
          }

          parentNode = parentNode.parentNode;
        }
      });
    }
  }
});

var finalArticleArray = [];
var finalFullTextArray = [];

function countrySelect() {
  $("#involvedStates").bsMultiSelect2({
    useCssPatch: true, // default, can be ommitted
    cssPatch: {
      choices: {
        columnCount: "3",
        listStyleType: "none",
      },
      choice: "px-md-2 px-1", // classes!
      choice_hover: "text-primary bg-light",
      choiceLabel_disabled: {
        opacity: ".65",
      },
      choiceCheckBox: "countryChoice",
      picks: {
        listStyleType: "none",
        display: "flex",
        flexWrap: "wrap",
        height: "auto",
        marginBottom: "0",
      },
      picks_focus: {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
      },
      picks_def: {
        minHeight: "calc(2.25rem + 2px)",
      },
      picks_lg: {
        minHeight: "calc(2.875rem + 2px)",
      },
      picks_sm: {
        minHeight: "calc(1.8125rem + 2px)",
      },
      pick: {
        styles: {
          paddingLeft: "0.2em",
          paddingRight: "0.2em",
          margin: "0.3em",
        },
        classes: "badge badge-pill badge-warning",
      },
      pickContent: {
        paddingRight: "10px",
        paddingLeft: "10px",
        fontSize: "1.2em",
      },
      pickButton: {
        fontSize: "2em",
        lineHeight: ".9em",
        float: "none",
      },
      filterInput: {
        border: "0px",
        height: "auto",
        boxShadow: "none",
        padding: "0",
        margin: "0",
        outline: "none",
        backgroundColor: "transparent",
      },
    },
    placeholder: "Select Involved State(s)",
    staticContentGenerator: null,
    getLabelElement: null,
    pickContentGenerator: null,
    choiceContentGenerator: null,
    buildConfiguration: null,
    isRtl: null,
    setSelected: null,
    required: null,
    optionsAdapter: null,
    options: null,
    getDisabled: null,
    getSize: null,
    getValidity: null,
    labelElement: null,
    valueMissingMessage: "",
    getIsValueMissing: null,
    // updateData:
  });
}
var articleDrop = function (finalArticleData) {
  articleDropdown = $("#article_0_select");
  data = finalArticleData;
  articleDropdown
    .empty()
    .append(
      $("<option></option>")
        .prop("value", "")
        .prop("disabled", true)
        .prop("selected", true)
        .prop("hidden", true)
        .text("Select Relevant Article")
    );
  $.each(data, function (article) {
    textValue = data[article];
    if (textValue === "Other articles") {
      articleDropdown.append(
        $("<option></option>")
          .prop("disabled", true)
          .addClass("dropdown-item")
          .text(textValue)
      );
    } else {
      articleDropdown.append(
        $("<option></option>")
          .prop("value", textValue)
          .addClass("dropdown-item")
          .text(textValue)
      );
    }
  });
};

var ratificationAPImethod = async function (countryURL) {
  startDateID = "#decisionDate1";
  endDateID = "#decisionDate2";
  selectCountryID = "#involvedStates";

  var echrDiv = document.getElementById("echrDetails");

  var selectedDate2 = moment($(endDateID).val(), "DD-MM-YYYY").format(
    "DD MMMM YYYY"
  );
  var selectedDate1 = moment($(startDateID).val(), "DD-MM-YYYY").format(
    "DD MMMM YYYY"
  );
  var currentSelectedCountry = $(selectCountryID).val();
  var finalCountryList = [];
  if (moment(selectedDate2, "DD MMMM YYYY").isValid()) {
    while (echrDiv.hasChildNodes()) {
      echrDiv.removeChild(echrDiv.lastChild);
    }
    axios({
      method: "get",
      url: countryURL,
    }).then(function (response) {
      countryData = response.data.country;
      currentSelectedCountry.forEach(function (countryName) {
        if (countryName in countryData) {
          ratDate = moment(
            countryData[countryName].ratDate,
            "DD-MM-YYYY"
          ).format("DD MMMM YYYY");
          finalCountryList.push(countryName);
          if (
            moment(selectedDate2, "DD MMMM YYYY").isBefore(
              moment(ratDate, "DD MMMM YYYY")
            ) ||
            moment(selectedDate1, "DD MMMM YYYY").isBefore(
              moment(ratDate, "DD MMMM YYYY")
            )
          ) {
            var pTag = document.createElement("p");
            var p2Tag = document.createElement("p");
            finalText =
              "<b>" +
              countryName +
              "</b>" +
              " ratified the European Convention on Human Rights and its Protocols on <b>" +
              ratDate +
              "</b>. If the act, decision or omission took place before " +
              ratDate +
              ", but the effects of the act, decision or omission still continue to the present day (eg: the act of a disappearance, where the person has not been found, even if the person can be presumed dead), please continue to the next field.<br>";
            p2Tag.innerHTML += finalText;
            textReady = pTag.appendChild(p2Tag);
            appendedP = echrDiv.appendChild(textReady);
          }
        }
      });
    });
  }
  return finalCountryList;
};

function courtAPImethod(countryUrl) {
  var courtData = document.getElementById("courtData");
  selectCountryID = "#involvedStates";
  while (courtData.hasChildNodes()) {
    courtData.removeChild(courtData.lastChild);
  }
  var currentSelectedCountry = $(selectCountryID).val();
  axios({
    method: "get",
    url: countryUrl,
    crossorigin: true,
  }).then(function (response) {
    data = response.data.country;
    currentSelectedCountry.forEach(function (countryName) {
      for (var prop in data) {
        if (prop === countryName) {
          courtDetail1 = document.createElement("tr");

          countryRow = document.createElement("td");
          countryRow.innerHTML = "<strong>" + prop + "</strong>";
          courtDetail1.appendChild(countryRow);

          proceedingRow1 = document.createElement("td");
          proceedingRow1.innerHTML = data[prop].Court.ProceedingType1;
          courtDetail1.appendChild(proceedingRow1);

          courtRow1 = document.createElement("td");
          courtRow1.innerHTML = data[prop].Court.Court1;
          courtDetail1.appendChild(courtRow1);
          courtData.appendChild(courtDetail1);
          if (
            !data[prop].proceedingType2 &&
            !data[prop].Court.ProceedingType3
          ) {
            courtDetail1.setAttribute(
              "style",
              "border-bottom: solid 3px #ffcc0040"
            );
          }

          if (data[prop].Court.ProceedingType2) {
            countryRow.setAttribute("rowspan", 2);
            countryRow.setAttribute("style", "vertical-align:middle");
            courtDetail2 = document.createElement("tr");
            proceedingRow2 = document.createElement("td");
            proceedingRow2.innerHTML = data[prop].Court.ProceedingType2;
            courtDetail2.appendChild(proceedingRow2);
            courtRow2 = document.createElement("td");
            courtRow2.innerHTML = data[prop].Court.Court2;
            courtDetail2.appendChild(courtRow2);
            courtData.appendChild(courtDetail2);
            if (!data[prop].Court.ProceedingType3) {
              countryRow.setAttribute(
                "style",
                "border-bottom: solid 3px #ffcc0040"
              );
              courtDetail2.setAttribute(
                "style",
                "border-bottom: solid 3px #ffcc0040"
              );
            }
          }

          if (data[prop].Court.ProceedingType3) {
            countryRow.setAttribute("rowspan", 3);
            countryRow.setAttribute("style", "vertical-align:middle");
            courtDetail3 = document.createElement("tr");
            proceedingRow3 = document.createElement("td");
            proceedingRow3.innerHTML = data[prop].Court.ProceedingType3;
            courtDetail3.appendChild(proceedingRow3);
            courtRow3 = document.createElement("td");
            courtRow3.innerHTML = data[prop].Court.Court3;
            courtDetail3.appendChild(courtRow3);
            courtData.appendChild(courtDetail3);
            courtDetail3.setAttribute(
              "style",
              "border-bottom: solid 3px #ffcc0040"
            );
            countryRow.setAttribute(
              "style",
              "border-bottom: solid 3px #ffcc0040"
            );
          }
        }
      }
    });
  });
}

var articleGenerateMethod = function (baseUrl, countryList) {
  articleUrl = baseUrl + "static/applicationForm/apiFiles/countryArticle.json";
  axios({
    method: "get",
    url: articleUrl,
    crossorigin: true,
  }).then(function (response) {
    country = response.data.country;
    articleData = response.data.article;

    var activeTotalArray = [];
    var finalActiveArray = [];
    finalArticleArray = [];
    finalFullTextArray = [];
    for (let item = 0; item < countryList.length; item++) {
      if (Object.keys(country).includes(countryList[item])) {
        var countryData = country[countryList[item]];
        activeTotalArray.push(countryData.Active);
      }
    }
    temp = _.zip(...activeTotalArray);
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].includes("y") || temp[i].includes("N/A")) {
        finalActiveArray.push(true);
      } else {
        finalActiveArray.push(false);
      }
    }
    for (var j = 0; j < finalActiveArray.length; j++) {
      if (finalActiveArray[j] === true) {
        finalArticleArray.push(articleData.Article[j]);
        finalFullTextArray.push(articleData["Full text"][j]);
      }
    }
    articleDrop(finalArticleArray);
  });
};

var countryArticle = function (baseUrl) {
  var countryUrl =
    baseUrl + "static/applicationForm/apiFiles/countryArticle.json";
  startDateID = "#decisionDate1";
  endDateID = "#decisionDate2";
  countrySelectID = "#involvedStates";

  $(endDateID).on("change", function () {
    if (
      $.trim($(startDateID).val()) != "" &&
      $.trim($(countrySelectID).val()) != ""
    ) {
      ratificationAPImethod(countryUrl).then(function (response) {
        articleGenerateMethod(baseUrl, response);
      });
    }
  });
  $(countrySelectID).on("change", function () {
    courtAPImethod(countryUrl);
    if (
      $.trim($(startDateID).val()) != "" &&
      $.trim($(endDateID).val()) != ""
    ) {
      ratificationAPImethod(countryUrl).then(function (response) {
        articleGenerateMethod(baseUrl, response);
      });
    }
  });
  $(startDateID).on("change", function () {
    if (
      $.trim($(countrySelectID).val()) != "" &&
      $.trim($(endDateID).val()) != ""
    ) {
      ratificationAPImethod(countryUrl).then(function (response) {
        articleGenerateMethod(baseUrl, response);
      });
    }
  });
  // end ratification date
};

function callAPI(addButtonID) {
  elementNumber = parseInt(addButtonID.split("_")[2]);
  correspDropdownElement = $(
    "#article_" + String(elementNumber + 1) + "_select"
  );
  var curValueArray = [];
  for (i = 0; i < elementNumber + 1; i++) {
    curValueArray.push($("#article_" + String(i) + "_select").val());
  }

  data = finalArticleArray;
  correspDropdownElement
    .empty()
    .append(
      $("<option></option>")
        .prop("value", "")
        .prop("disabled", true)
        .prop("selected", true)
        .prop("hidden", true)
        .text("Select Relevant Article")
    );
  $.each(data, function (article) {
    textValue = data[article];
    if (textValue === "Other articles" || curValueArray.includes(textValue)) {
      correspDropdownElement.append(
        $("<option></option>")
          .prop("disabled", true)
          .addClass("dropdown-item")
          .text(textValue)
      );
    } else {
      correspDropdownElement.append(
        $("<option></option>")
          .prop("value", textValue)
          .addClass("dropdown-item")
          .text(textValue)
      );
    }
  });
}

function getDerogationText(selectedArticle, tableElement) {
  selectedCountryList = $("#involvedStates").val();
  curIndex = finalArticleArray.indexOf(selectedArticle);
  baseUrl = window.location.href.split("form/")[0];
  articleUrl = baseUrl + "static/applicationForm/apiFiles/countryArticle.json";

  /* <tr>
                        <td><div class="countryDiv"></div></td>
                        <td ><div class="reservationDiv"></div></td>
                      </tr> */
  axios({
    method: "get",
    url: articleUrl,
    crossorigin: true,
  }).then(function (response) {
    countryData = response.data.country;
    selectedCountryList.forEach(function (country) {
      var newTRelement = document.createElement("tr");
      newTRelement.style =
        "border: solid; border-color: #eeeded; border-width: medium; margin: 10px;";
      currentCountry = country;

      h6Element = document.createElement("h6");
      h6Element.setAttribute(
        "style",
        "padding-left:30px; padding-right:30px; font-family:lato_thin"
      );
      pElement = document.createElement("p");
      pElement.setAttribute(
        "style",
        "padding-left:30px; padding-right:30px; font_family:lato_thin"
      );
      h6Element.innerHTML = currentCountry;
      pElement.innerHTML = countryData[currentCountry].Reservations[curIndex];
      if (
        countryData.hasOwnProperty(currentCountry) &&
        countryData[currentCountry].Reservations.curIndex != "N/A"
      ) {
        var newTDelement1 = document.createElement("td");
        var newTDelement2 = document.createElement("td");
        newTDelement2.style = "word-break: break-word;";
        newTDelement1.append(h6Element);
        newTRelement.append(newTDelement1);
        newTDelement2.append(pElement);
        newTRelement.append(newTDelement2);
        tableElement.append(newTRelement);
      }
    });
  });
}

function populateDiv(elId) {
  containerElement = document.getElementById(elId).parentElement.parentElement
    .parentElement.parentElement.parentElement.children[2].parentElement
    .children[2];
  tableElement = containerElement.children[2].children[0];
  containerElement.classList.remove("is-hidden");
  selectedElement = document.getElementById(elId).value;

  pElement = document.createElement("p");
  pElement.setAttribute(
    "style",
    "padding-left:30px; padding-right:30px; font-weight:600;"
  );
  p2Element = document.createElement("p");
  p2Element.setAttribute("style", "text-align:justify");

  // articleElement = containerElement.children[0].children[0];
  // descriptionElement = containerElement.children[0].children[1];
  descriptionElement = document.querySelector(".descDiv1");
  if (descriptionElement) {
    $.each(finalArticleArray, function (article) {
      textValue = finalArticleArray[article];
      if (finalArticleArray[article] === selectedElement) {
        if (tableElement.lastChild) {
          $(tableElement).empty();
        }
        getDerogationText(finalArticleArray[article], tableElement);
        if (descriptionElement.lastChild) {
          $(descriptionElement).empty();
        }
        // full text
        // console.log(finalFullTextArray);

        // finalArticleArray[article];
        // pElement.innerHTML = finalArticleArray[article];
        // articleElement.append(pElement);
        // p2Element.innerHTML = finalFullTextArray[article];
        // descriptionElement.append(p2Element);
        for (i = 0; i < finalFullTextArray[article].length; i++) {
          let ulOuterElement = document.createElement("ul");
          let liOuterElement = document.createElement("li");
          let temp = finalFullTextArray[article][i];
          let inputOuterElement = document.createElement("input");
          var labelOuterElement = document.createElement("label");
          inputOuterElement.type = "checkbox";
          inputOuterElement.name = "outerInputList";
          inputOuterElement.id = "outerInputList_" + String(i);
          inputOuterElement.classList.add("inputOuter", "articleCheck");
          inputOuterElement.style.cssText =
            "margin-right: 10px; transform: scale(0.80);";
          if (!Array.isArray(temp.mainText)) {
            inputOuterElement.value = temp.mainText.substr(0, 2);
          }
          labelOuterElement.htmlFor = "id";
          labelOuterElement.append(document.createTextNode(temp.mainText));
          labelOuterElement.style.cssText =
            "display: inline; font-size: 80% !important;";
          liOuterElement.append(inputOuterElement);
          liOuterElement.append(labelOuterElement);
          liOuterElement.style.cssText = "margin: 0px;";

          if (temp.points.length != 0) {
            temp.points.forEach((point) => {
              let ulInnerElement = document.createElement("ul");
              let liInnerElement = document.createElement("li");
              let inputInnerElement = document.createElement("input");
              let labelInnerElement = document.createElement("label");
              inputInnerElement.type = "checkbox";
              inputInnerElement.name = "innerInputList";
              inputInnerElement.id =
                "innerInputList_" + String(temp.points.indexOf(point));
              inputInnerElement.classList.add("inputInner", "articleCheck");
              inputInnerElement.style.cssText =
                "margin-right: 10px; transform: scale(0.80);";
              inputInnerElement.value = point.substr(0, 3);
              labelInnerElement.htmlFor = "id";
              labelInnerElement.append(document.createTextNode(point));
              labelInnerElement.style.cssText =
                "display: inline; font-size: 75% !important;";
              liInnerElement.append(inputInnerElement);
              liInnerElement.append(labelInnerElement);
              liInnerElement.style.cssText = "margin: 0px;";
              ulInnerElement.append(liInnerElement);
              liOuterElement.append(ulInnerElement);
              ulInnerElement.style.cssText =
                "list-style: none; margin: 0px; padding-left: 20px;";
            });
          }
          ulOuterElement.append(liOuterElement);
          ulOuterElement.style.cssText =
            "list-style: none; margin: 0px; padding: 0px;";
          descriptionElement.append(ulOuterElement);
        }
      }
    });
  }
}

function checkUrlAndLoadAPI() {
  var request = new XMLHttpRequest();
  rootUrl = window.location.href.split("form/")[0];
  request.open("GET", rootUrl, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 404) {
        alert(
          "There is something wrong with the server. Please try again later!!"
        );
      }
    }
  };
  request.send();
  countryArticle(rootUrl);
  countrySelect();
}

checkUrlAndLoadAPI();
