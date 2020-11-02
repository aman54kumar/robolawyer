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

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  try {
    baseUrl = url;
    // echrRat(baseUrl);
    courtCountry(baseUrl);
  } catch (error) {
    console.error(error);
  }
}

function UrlExists2(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  try {
    baseUrl = url;
    articleDrop(baseUrl);
  } catch (error) {
    console.error(error);
  }
}

function UrlExists3(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  try {
    baseUrl = url;
    countryArticle(baseUrl);
    countrySelect();
  } catch (error) {
    console.error(error);
  }
}

function ratificationAPImethod(
  selectCountryID,
  startDateID,
  endDateID,
  countryURL
) {
  var echrDiv = document.getElementById("echrDetails");
  $(endDateID).on("change", function () {
    if (
      $.trim($(startDateID).val()) != "" &&
      $.trim($(selectCountryID).val()) != ""
    ) {
      var selectedDate2 = moment($(this).val(), "DD-MM-YYYY").format(
        "DD MMMM YYYY"
      );
      var selectedDate1 = moment($(startDateID).val(), "DD-MM-YYYY").format(
        "DD MMMM YYYY"
      );
      var currentSelectedCountry = $("#involvedStates").val();
      if (moment(selectedDate2, "DD-MMMM-YYYY").isValid()) {
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
              // ratDate = moment(countryData[countryName].ratDate).format(
              //   "DD-MM-YYYY"
              // );
              console.log(countryData[countryName]["ratDate"]);
              //     formattedRatDate = moment(ratDate, "DD-MM-YYYY").format(
              //       "DD MMMM YYYY"
              //     );
              //     if (moment(formattedSelectedDate).isBefore(formattedRatDate)) {
              //       var countryname = countryName.split("-");
              //       var formattedCountryName = countryname[1].trim();
              //       var pTag = document.createElement("p");
              //       var p2Tag = document.createElement("p");
              //       finalText =
              //         "<b>" +
              //         formattedCountryName +
              //         "</b>" +
              //         " ratified the European Convention on Human Rights and its Protocols on <b>" +
              //         formattedRatDate +
              //         "</b>. If the act, decision or omission took place before " +
              //         formattedRatDate +
              //         ", but the effects of the act, decision or omission still continue to the present day (eg: the act of a disappearance, where the person has not been found, even if the person can be presumed dead), please continue to the next field.<br>";
              //       p2Tag.innerHTML += finalText;
              //       textReady = pTag.appendChild(p2Tag);
              //       appendedP = echrDiv.appendChild(textReady);
              //     }
            }
          });
        });
      }
    }
  });
}

// var echrRat = function (baseUrl) {
//   var echrUrl = baseUrl + "api/echr/";

//   var echrDiv = document.getElementById("echrDetails");
//   $("#decisionDate2").on("change", function () {
//     var currentSelectedDate = $(this).val();
//     var currentSelectedCountry1 = $("#involvedStates").val();
//     var formattedSelectedDate = moment(
//       currentSelectedDate,
//       "DD-MM-YYYY"
//     ).format("DD MMMM YYYY");
//     if (moment(currentSelectedDate, "DD-MM-YYYY")._isValid) {
//       while (echrDiv.hasChildNodes()) {
//         echrDiv.removeChild(echrDiv.lastChild);
//       }
//       axios({
//         method: "get",
//         url: echrUrl,
//       }).then(function (response) {
//         data = response.data;
//         // console.log(currentSelected);
//         currentSelectedCountry1.forEach((countryName) => {
//           for (var i = 0; i < data.length; i++) {
//             if (data[i].country == countryName) {
//               ratDate = moment(data[i].ratDate).format("DD-MM-YYYY");
//               formattedRatDate = moment(ratDate, "DD-MM-YYYY").format(
//                 "DD MMMM YYYY"
//               );
//               if (moment(formattedSelectedDate).isBefore(formattedRatDate)) {
//                 var countryname = countryName.split("-");
//                 var formattedCountryName = countryname[1].trim();

//                 var pTag = document.createElement("p");
//                 var p2Tag = document.createElement("p");
//                 finalText =
//                   "<b>" +
//                   formattedCountryName +
//                   "</b>" +
//                   " ratified the European Convention on Human Rights and its Protocols on <b>" +
//                   formattedRatDate +
//                   "</b>. If the act, decision or omission took place before " +
//                   formattedRatDate +
//                   ", but the effects of the act, decision or omission still continue to the present day (eg: the act of a disappearance, where the person has not been found, even if the person can be presumed dead), please continue to the next field.<br>";
//                 p2Tag.innerHTML += finalText;
//                 textReady = pTag.appendChild(p2Tag);
//                 appendedP = echrDiv.appendChild(textReady);
//               }
//             }
//           }
//         });
//       });
//     }
//   });
// };

var courtCountry = function (baseUrl) {
  var courtUrl = baseUrl + "api/court/";
  $("#decisionDate2").on("change", function () {
    currentSelectedCountry = $("#involvedStates").val();
    while (courtData.hasChildNodes()) {
      courtData.removeChild(courtData.lastChild);
    }
    axios({
      method: "get",
      url: courtUrl,
      crossorigin: true,
    }).then(function (response) {
      data = response.data;
      courtData = document.getElementById("courtData");
      currentSelectedCountry.forEach((country) => {
        for (var i = 0; i < data.length; i++) {
          // countryArray = country.split("-");
          countryName = country;

          if (data[i].country == countryName) {
            courtDetail1 = document.createElement("tr");

            countryRow = document.createElement("td");
            countryRow.innerHTML = "<strong>" + data[i].country + "</strong>";
            courtDetail1.appendChild(countryRow);

            proceedingRow1 = document.createElement("td");
            proceedingRow1.innerHTML = data[i].proceedingType1;
            courtDetail1.appendChild(proceedingRow1);

            courtRow1 = document.createElement("td");
            courtRow1.innerHTML = data[i].court1;
            courtDetail1.appendChild(courtRow1);
            courtData.appendChild(courtDetail1);
            if (!data[i].proceedingType2 && !data[i].proceedingType3) {
              courtDetail1.setAttribute(
                "style",
                "border-bottom: solid 3px #ffcc0040"
              );
            }

            if (data[i].proceedingType2) {
              countryRow.setAttribute("rowspan", 2);
              countryRow.setAttribute("style", "vertical-align:middle");
              courtDetail2 = document.createElement("tr");
              proceedingRow2 = document.createElement("td");
              proceedingRow2.innerHTML = data[i].proceedingType2;
              courtDetail2.appendChild(proceedingRow2);
              courtRow2 = document.createElement("td");
              courtRow2.innerHTML = data[i].court2;
              courtDetail2.appendChild(courtRow2);
              courtData.appendChild(courtDetail2);
              if (!data[i].proceedingType3) {
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

            if (data[i].proceedingType3) {
              countryRow.setAttribute("rowspan", 3);
              countryRow.setAttribute("style", "vertical-align:middle");
              courtDetail3 = document.createElement("tr");
              proceedingRow3 = document.createElement("td");
              proceedingRow3.innerHTML = data[i].proceedingType3;
              courtDetail3.appendChild(proceedingRow3);
              courtRow3 = document.createElement("td");
              courtRow3.innerHTML = data[i].court3;
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
  });
};

var articleDrop = function (baseUrl) {
  var articleUrl = baseUrl + "api/article/";
  $(document).ready(function () {
    articleDropdown = $("#article_0_select");
    axios({
      method: "get",
      url: articleUrl,
    }).then(function (response) {
      data = response.data;
      articleDropdown.append(
        $("<option></option>")
          .attr("value", "")
          .prop("disabled", true)
          .prop("selected", true)
          .prop("hidden", true)
          .text("Select Relevant Article")
      );
      $.each(data, function (article) {
        textValue = data[article]["article"];
        if (textValue === "Other articles") {
          articleDropdown.append(
            $("<option></option>").prop("disabled", true).text(textValue)
          );
        }
        //   else if {
        //   console.log("hide previous selected options");
        // }
        else {
          articleDropdown.append(
            $("<option></option>").attr("value", textValue).text(textValue)
          );
        }
      });
    });
  });
};

var countryArticle = function (baseUrl) {
  var countryUrl =
    baseUrl + "static/applicationForm/apiFiles/countryArticle.json";
  axios({
    method: "get",
    url: countryUrl,
  }).then(function (response) {
    countries = response.data.country;
    countryDropdownElement = document.getElementById("involvedStates");
    // ratification date
    ratificationAPImethod(
      "#involvedStates",
      "#decisionDate1",
      "#decisionDate2",
      countryUrl
    );

    // end ratification date
  });
};

rootUrl = window.location.href.split("form/")[0];
UrlExists(rootUrl);
UrlExists2(rootUrl);
UrlExists3(rootUrl);

function callAPI(addButtonID) {
  elementNumber = parseInt(addButtonID.split("_")[2]);
  url = window.location.href.split("form/")[0];
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  try {
    baseUrl = url;
    articleUrl = baseUrl + "api/article/";
    correspDropdownElement = $(
      "#article_" + String(elementNumber + 1) + "_select"
    );
    var curValueArray = [];
    for (i = 0; i < elementNumber + 1; i++) {
      curValueArray.push($("#article_" + String(i) + "_select").val());
    }
    axios({
      method: "get",
      url: articleUrl,
    }).then(function (response) {
      data = response.data;
      correspDropdownElement.append(
        $("<option></option>")
          .attr("value", "")
          .prop("disabled", true)
          .prop("selected", true)
          .prop("hidden", true)
          .text("Select Relevant Article")
      );
      $.each(data, function (article) {
        textValue = data[article]["article"];
        if (
          textValue === "Other articles" ||
          curValueArray.includes(textValue)
        ) {
          correspDropdownElement.append(
            $("<option></option>").prop("disabled", true).text(textValue)
          );
        } else {
          correspDropdownElement.append(
            $("<option></option>").attr("value", textValue).text(textValue)
          );
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function populateDiv(elId) {
  url = window.location.href.split("form/")[0];
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();

  baseUrl = url;
  var articleUrl = baseUrl + "api/article/";
  containerElement = document.getElementById(elId).parentElement.parentElement
    .parentElement.parentElement.parentElement.children[2].parentElement
    .children[2];
  containerElement.classList.remove("is-hidden");
  selectedElement = document.getElementById(elId).value;
  pElement = document.createElement("p");
  pElement.setAttribute(
    "style",
    "padding-left:30px; padding-right:30px; font-weight:600;"
  );
  p2Element = document.createElement("p");
  p2Element.setAttribute("style", "text-align:justify");

  articleElement = containerElement.children[0].children[0];
  descriptionElement = containerElement.children[0].children[1];
  if (articleElement)
    axios({
      method: "get",
      url: articleUrl,
    }).then(function (response) {
      data = response.data;
      $.each(data, function (article) {
        textValue = data[article]["article"];
        if (data[article]["article"] === selectedElement) {
          if (articleElement.lastChild) {
            articleElement.lastChild.remove();
            descriptionElement.lastChild.remove();
          }
          pElement.innerHTML = data[article]["article"];
          articleElement.append(pElement);
          p2Element.innerHTML = data[article]["fullText"];
          descriptionElement.append(p2Element);
        }
      });
    });
}
