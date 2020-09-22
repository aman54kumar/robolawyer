function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.withCredentials = true;
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
  try {
    baseUrl = url;
    echrRat(baseUrl);
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

var echrRat = function (baseUrl) {
  var echrUrl = baseUrl + "api/echr/";

  var echrDiv = document.getElementById("echrDetails");
  $("#decisionDate1").on("change", function () {
    console.log($(this));
    currentSelected = $(this).val();
    // console.log(currentSelected);
    a = moment(currentSelected, "DD-MM-YYYY").format("DD MMMM YYYY");
    // console.log(a);
    if (moment(currentSelected, "DD-MM-YYYY")._isValid) {
      while (echrDiv.hasChildNodes()) {
        echrDiv.removeChild(echrDiv.lastChild);
      }
      axios({
        method: "get",
        url: echrUrl,
      }).then(function (response) {
        data = response.data;
        // console.log(currentSelected);
        currentSelected.forEach((countryName) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].country == countryName) {
              ratDate = data[i].ratDate;
              formattedDate = moment(ratDate).format("DD MMMM YYYY");
              // end date from field

              // end date
              // console.log(formattedDate);
              var countryname = countryName.split("-");
              formattedCountryName = countryname[1].trim();

              var pTag = document.createElement("p");
              var p2Tag = document.createElement("p");
              finalText =
                "<b>" +
                formattedCountryName +
                "</b>" +
                " ratified the European Convention on Human Rights and its Protocols on <b>" +
                formattedDate +
                "</b>. If the act, decision or omission take place before " +
                formattedDate +
                ", but the effects of the act, decision or omission still continue to the present day (eg: the act of a disappearance, where the person has not been found, even if the person can be presumed dead), please continue to the next field.<br>";
              p2Tag.innerHTML += finalText;
              textReady = pTag.appendChild(p2Tag);
              appendedP = echrDiv.appendChild(textReady);
            }
          }
        });
      });
    }
  });
};

var courtCountry = function (baseUrl) {
  var courtUrl = baseUrl + "api/court/";
  $("#decisionDate1").on("change", function () {
    currentSelected = $("#involvedStates").val();
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
      currentSelected.forEach((country) => {
        for (var i = 0; i < data.length; i++) {
          countryArray = country.split("-");
          countryName = countryArray[1].trim();

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
        } else {
          articleDropdown.append(
            $("<option></option>").attr("value", textValue).text(textValue)
          );
        }
      });
    });
  });
};

rootUrl = window.location.href.split("form/")[0];
UrlExists(rootUrl);
UrlExists2(rootUrl);

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
        if (textValue === "Other articles") {
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
