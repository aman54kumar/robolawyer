// selects all child input checkboxes and applies the checked
// item of the one that has been clicked on
let derogationTableDict = new Map();
function getEditedArticleAsPrefix(initialText) {
  var initialArrayPart = initialText.split(" - ")[0];
  var articleNameAsArray = initialArrayPart.split(" ");
  if (articleNameAsArray.includes("Protocol")) {
    return "P" + articleNameAsArray[5] + "-" + articleNameAsArray[1] + "-";
  } else {
    return articleNameAsArray[1] + "-";
  }
}

function getCheckedArticlesList(cbParent) {
  cbTDParent = cbParent.parentElement.parentElement;
  var mainCheckBoxes = Array.from(cbParent.children);
  var resultList = [];
  mainCheckBoxes.forEach((mainElement) => {
    if (mainElement.children[0].checked) {
      // main checkbox is checked

      resultList.push(mainElement.children[0].value);
    } else if (mainElement.children[0].indeterminate) {
      // indeterminate -> check children
      var resultSubList = [];
      var subCheckBoxes = Array.from(mainElement.children[2].children);
      subCheckBoxes.forEach((subElement) => {
        if (subElement.children[0].checked) {
          // Article 6-2-b and 6-3
          resultSubList.push(subElement.children[0].value);
        }
      });
      var resultString = mainElement.children[0].value + "-";
      resultString += resultSubList.join(",");
      resultList.push(resultString);
    }
  });

  var alertText = "";
  if (cbTDParent.tagName == "TD") {
    alertText = cbTDParent.querySelector(".page5AlertText");
  } else {
    alertText = cbTDParent.parentElement.querySelector(".page5SecondAlertText");
  }

  if (resultList.length == 0) {
    alertText.classList.remove("is-hidden");
  } else {
    alertText.classList.add("is-hidden");
  }

  return resultList;
}

function addFieldTo6thPage(cbParent, currentArticleID, descDivClass) {
  var mainCheckBoxes = Array.from(cbParent.children);
  currentElement = document.getElementById(currentArticleID);
  currentValue = currentElement.value;
  currentId = currentElement.id;
  currentNumber = currentId.split("_")[1];
  page6First = "#preArticle_" + String(currentNumber) + "_select";
  page6Second = "complain_" + String(parseInt(currentNumber)) + "_select";
  if (Number(currentNumber) > 0) {
    buttonElementId = "addButton_6_" + String(parseInt(currentNumber) - 1);
    buttonElement = document.getElementById(buttonElementId);
    nextElementButtonId = "addButton_6_" + String(parseInt(currentNumber));
    if (!document.body.contains(document.getElementById(nextElementButtonId))) {
      document.getElementById(buttonElementId).click();
    }
  }
  var resultList = getCheckedArticlesList(cbParent);
  var fixedText = getEditedArticleAsPrefix(currentValue);
  var preVal = "";

  preVal = document.getElementById(page6Second).value.split("\n").join("");
  preVal = preVal.substr(0, preVal.length - 3);
  preValArray = preVal.split(" in Conjunction with ");
  articleValue = preValArray[0];
  conjugateValue = "";
  if (preValArray.length == 2) conjugateValue = preValArray[1];
  if (mainCheckBoxes.length > 1) {
    resultList = resultList.map((item) => fixedText + item);
    if (fixedText[0] === "P") {
      fixedText = resultList.join(" and ");
    } else {
      fixedText = "Article " + resultList.join(" and ");
    }

    if (descDivClass === ".descDiv1") {
      fixedText =
        fixedText +
        (conjugateValue === "" ? "" : " in Conjunction with " + conjugateValue);
    } else {
      fixedText =
        articleValue +
        (fixedText === "" ? "" : " in Conjunction with " + fixedText);
    }

    fixedText += " : ";
    fixedLen = 26;
    charCount = 0;

    for (var i = 0; i < fixedText.length; i++) {
      if (charCount == fixedLen) {
        fixedText =
          fixedText.substring(0, i) +
          "\n" +
          fixedText.substring(i, fixedText.length);
        charCount = 0;
        i += 1;
      } else {
        charCount++;
      }
    }
  } else {
    if (fixedText[0] === "P") {
      fixedText = fixedText;
    } else {
      fixedText = "Article " + fixedText.substring(0, fixedText.length - 1);
    }
    if (descDivClass === ".descDiv1") {
      fixedText =
        fixedText +
        (conjugateValue === "" ? "" : " in Conjunction with " + conjugateValue);
    } else {
      fixedText =
        articleValue +
        (fixedText === "" ? "" : " in Conjunction with " + fixedText);
    }

    fixedText += " : ";
    fixedLen = 26;
    charCount = 0;

    for (var i = 0; i < fixedText.length; i++) {
      if (charCount == fixedLen) {
        fixedText =
          fixedText.substring(0, i) +
          "\n" +
          fixedText.substring(i, fixedText.length);
        charCount = 0;
        i += 1;
      } else {
        charCount++;
      }
    }
    // fixedText += " ";
  }

  $("#" + page6Second).val(fixedText);
  $(page6First).val(fixedText);
}

function onCheckArticleDesc(
  checkBox,
  cbParent,
  articleSelectID,
  descDivClass,
  isLabel
) {
  if (isLabel) {
    checkBox.checked = !checkBox.checked;
  }
  let parentNode = checkBox.parentNode;
  const cbDescendants = parentNode.querySelectorAll("input.articleCheck");
  for (let y = 0; y < cbDescendants.length; y++) {
    cbDescendants[y].checked = checkBox.checked;
    cbDescendants[y].indeterminate = false;
  }

  while (["ul", "li"].indexOf(parentNode.nodeName.toLowerCase()) >= 0) {
    const mainCb = parentNode.querySelector(":scope > input.articleCheck");

    if (mainCb && mainCb != checkBox) {
      mainCb.checked = checkBox.checked;

      const mainCbChildren =
        mainCb.parentNode.querySelectorAll(".articleCheck");
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
  addFieldTo6thPage(cbParent, articleSelectID, descDivClass);
}

function getSelectedCheckboxes() {
  $(".articleCheck:checked");
}

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
  selectCountryID = "#involvedStates";

  var echrDiv = document.getElementById("echrDetails");

  var selectedDate1 = moment($(startDateID).val(), "DD-MM-YYYY").format(
    "DD MMMM YYYY"
  );
  var currentSelectedCountry = $(selectCountryID).val();
  var finalCountryList = [];
  if (moment(selectedDate1, "DD MMMM YYYY").isValid()) {
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
              " ratified the European Convention on Human Rights on <b>" +
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
          } else {
            courtRow1.setAttribute(
              "style",
              "border-bottom: solid 3px #ffcc0040"
            );
            proceedingRow1.setAttribute(
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
            } else {
              courtRow2.setAttribute(
                "style",
                "border-bottom: solid 3px #ffcc0040"
              );
              proceedingRow2.setAttribute(
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
  countrySelectID = "#involvedStates";

  $(countrySelectID).on("change", function () {
    courtAPImethod(countryUrl);
    if ($.trim($(startDateID).val()) != "") {
      ratificationAPImethod(countryUrl).then(function (response) {
        articleGenerateMethod(baseUrl, response);
      });
    }
  });
  $(startDateID).on("change", function () {
    if ($.trim($(countrySelectID).val()) != "") {
      ratificationAPImethod(countryUrl).then(function (response) {
        articleGenerateMethod(baseUrl, response);
      });
    }
  });
  // end ratification date
};

function callAPI(addButtonIDornewDiv) {
  data = finalArticleArray;
  if (
    document.getElementById(addButtonIDornewDiv) &&
    document.getElementById(addButtonIDornewDiv).classList.contains("a-btnAdd")
  ) {
    elementNumber = parseInt(addButtonIDornewDiv.split("_")[2]);
    correspDropdownElement = $(
      "#article_" + String(elementNumber + 1) + "_select"
    );
    var curValueArray = [];
    for (i = 0; i < elementNumber + 1; i++) {
      curValueArray.push($("#article_" + String(i) + "_select").val());
    }
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
  } else {
    // TODO - ensure select is used once only, make condition.
    newDropdownElement = document.createElement("select");
    parentSelectId =
      addButtonIDornewDiv.parentElement.parentElement.children[1].id;
    childSelectId = parentSelectId + "_conj";
    newDropdownElement.id = childSelectId;
    newDropdownElement.classList += "form-control";
    // console.log($(addButtonIDornewDiv).find("select").length);
    if ($(addButtonIDornewDiv).find("select").length === 0) {
      correspDropdownElement = addButtonIDornewDiv.insertBefore(
        newDropdownElement,
        addButtonIDornewDiv.children[1]
      );
      newDropdownElement.addEventListener("change", () => {
        populateDiv(childSelectId, ".descDiv2");
      });

      correspDropdownElement = $(correspDropdownElement);
      correspDropdownElement.append(
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
  }
}

function getDerogationText(selectedArticle, derogationTableDict) {
  selectedCountryList = $("#involvedStates").val();
  curIndex = finalArticleArray.indexOf(selectedArticle);
  baseUrl = window.location.href.split("form/")[0];
  articleUrl = baseUrl + "static/applicationForm/apiFiles/countryArticle.json";
  axios({
    method: "get",
    url: articleUrl,
    crossorigin: true,
  }).then((response) => {
    countryData = response.data.country;
    selectedCountryList.forEach(function (country) {
      if (derogationTableDict.has(country)) {
        const temp_array = derogationTableDict.get(country);
        temp_array.push(countryData[country].Reservations[curIndex]);
        derogationTableDict.set(country, temp_array);
      } else {
        derogationTableDict.set(country, [
          countryData[country].Reservations[curIndex],
        ]);
      }
    });
    showDerogationText(tableElement, derogationTableDict);
  });
}

const showDerogationText = (tableDiv, derogationMap) => {
  let table = document.createElement("table");

  for (const [country, dText] of derogationMap.entries()) {
    let row = document.createElement("tr");
    row.setAttribute("style", "border-bottom: solid 1px black");
    let cell1 = document.createElement("td");
    cell1.innerHTML = "<p>" + country + "</p>";
    row.appendChild(cell1);
    dText.forEach((texts) => {
      if (texts !== "N/A") {
        let internalRow = document.createElement("tr");
        let cell2 = document.createElement("td");
        cell2.innerHTML =
          "<p style='padding-left:30px; padding-right:30px; font_family:lato_thin'>" +
          texts +
          "</p>";
        internalRow.appendChild(cell2);
        row.appendChild(internalRow);
      }
    });
    if (row.children.length !== 1) table.appendChild(row);
  }
  tableDiv.appendChild(table);
};

function populateDiv(elId, descDivClass) {
  selectedElement = document.getElementById(elId);
  selectTDElement = selectedElement.parentElement;
  selectedElementValue = selectedElement.value;
  conjDivElement =
    selectTDElement.parentElement.querySelector(".secondSelectDiv");
  if (descDivClass === ".descDiv1") {
    alertText = selectTDElement.querySelector(".page5AlertText");

    containerElement =
      document.getElementById(elId).parentElement.parentElement.parentElement
        .parentElement.parentElement.children[2].parentElement.children[2];
    $(conjDivElement).empty();
    var descDiv2 = document.createElement("div");
    descDiv2.classList.add("descDiv2");
    conjDivElement.append(descDiv2);
    // hide conj alert
    conjDivElement.parentElement
      .querySelector(".page5SecondAlertText")
      .classList.add("is-hidden");
  } else {
    alertText = conjDivElement.parentElement.querySelector(
      ".page5SecondAlertText"
    );
    containerElement =
      document.getElementById(elId).parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement.children[2]
        .parentElement.children[2];
  }

  tableElement = containerElement.children[2].children[0];
  containerElement.classList.remove("is-hidden");

  if (conjDivElement.childElementCount === 1) {
    conjunctionArticle(conjDivElement);
  }

  pElement = document.createElement("p");
  pElement.setAttribute(
    "style",
    "padding-left:30px; padding-right:30px; font-weight:600;"
  );
  p2Element = document.createElement("p");
  p2Element.setAttribute("style", "text-align:justify");

  descriptionElement = selectTDElement.querySelector(descDivClass);
  var alertText;

  alertText.classList.remove("is-hidden");
  if (descriptionElement) {
    $.each(finalArticleArray, function (article) {
      textValue = finalArticleArray[article];

      if (finalArticleArray[article] === selectedElementValue) {
        if (tableElement.lastChild) {
          $(tableElement).empty();
        }
        if (descriptionElement.childElementCount != 0) {
          $(descriptionElement).empty();
        }
        if (!$(conjDivElement).find("select").length) {
          derogationTableDict.clear();
        }
        getDerogationText(finalArticleArray[article], derogationTableDict);

        // full text
        let ulOuterElement = document.createElement("ul");
        ulOuterElement.id = "ulOuterElement";
        for (i = 0; i < finalFullTextArray[article].length; i++) {
          let liOuterElement = document.createElement("li");
          let temp = finalFullTextArray[article][i];
          let inputOuterElement = document.createElement("input");
          var labelOuterElement = document.createElement("label");
          inputOuterElement.type = "checkbox";
          inputOuterElement.id = "outerInputList_" + String(i);
          inputOuterElement.classList.add("inputOuter", "articleCheck");
          inputOuterElement.style.cssText =
            "margin-right: 10px; transform: scale(0.80);";

          if (!Array.isArray(temp.mainText)) {
            inputOuterElement.value = temp.mainText.substring(0, 1);
          }

          labelOuterElement.htmlFor = "id";
          labelOuterElement.append(document.createTextNode(temp.mainText));
          labelOuterElement.style.cssText =
            "display: inline; font-size: 80% !important;";

          inputOuterElement.addEventListener("change", (event) => {
            onCheckArticleDesc(
              inputOuterElement,
              ulOuterElement,
              elId,
              descDivClass,
              false
            );
          });
          labelOuterElement.addEventListener("click", (event) => {
            onCheckArticleDesc(
              inputOuterElement,
              ulOuterElement,
              elId,
              descDivClass,
              true
            );
          });

          liOuterElement.append(inputOuterElement);
          liOuterElement.append(labelOuterElement);
          liOuterElement.style.cssText = "margin: 0px;";

          if (temp.points.length != 0) {
            let ulInnerElement = document.createElement("ul");
            temp.points.forEach((point) => {
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
              inputInnerElement.value = point.substring(1, 2);

              inputInnerElement.addEventListener("change", (event) =>
                event.preventDefault()
              );
              liInnerElement.addEventListener("click", (event) => {
                event.stopPropagation();
                onCheckArticleDesc(
                  inputInnerElement,
                  ulOuterElement,
                  elId,
                  descDivClass,
                  false
                );
              });
              labelInnerElement.addEventListener("click", (event) => {
                event.stopPropagation();
                onCheckArticleDesc(
                  inputInnerElement,
                  ulOuterElement,
                  elId,
                  descDivClass,
                  true
                );
              });

              labelInnerElement.htmlFor = "id";
              labelInnerElement.append(document.createTextNode(point));
              labelInnerElement.style.cssText =
                "display: inline; font-size: 75% !important;";
              liInnerElement.append(inputInnerElement);
              liInnerElement.append(labelInnerElement);
              liInnerElement.style.cssText = "margin: 0px;";
              ulInnerElement.append(liInnerElement);

              ulInnerElement.style.cssText =
                "list-style: none; margin: 0px; padding-left: 20px;";
            });
            liOuterElement.append(ulInnerElement);
          }
          ulOuterElement.style.cssText =
            "list-style: none; margin: 0px; padding: 0px;";
          ulOuterElement.append(liOuterElement);
        }
        descriptionElement.append(ulOuterElement);
      }
    });
  }
}

function conjunctionArticle(parentDivElement) {
  buttonElement = document.createElement("button");
  buttonElement.innerHTML = "Add Conjunction Article";
  buttonElement.className += "btn btn-secondary conjBtn";
  parentDivElement.insertBefore(buttonElement, parentDivElement.children[0]);
  $(document.body).on("click", ".conjBtn", function () {
    callAPI(parentDivElement);
    $(".conjBtn").addClass("is-hidden").removeClass("conjBtn");
  });
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
