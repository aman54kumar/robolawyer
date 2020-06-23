currentStep = 0;

document.addEventListener("DOMContentLoaded", function () {
  var stepperFormEl = document.querySelector("#stepperForm");
  stepperForm = new Stepper(stepperFormEl, {
    animation: true,
    linear: false,
    excluded:
      "input[type=button], input[type=submit], input[type=reset], input[type=hidden], :disabled",
  });
  var form = stepperFormEl.querySelector(".bs-stepper-content form");
  stepperFormEl.addEventListener("show.bs-stepper", function (event) {
    stepDifference = event.detail.to - currentStep;
    if (event.detail.to <= currentStep) {
      if (event.detail.from != currentStep) {
        if (!checkValidation(event.detail.from)) {
          currentStep = event.detail.from;
          // stepperForm.to(event.detail.from+1);
          swal("Please answer the mandatory fields first.");
          event.preventDefault();
        }
      }
    } else if (stepDifference === 1) {
      // next from current page, validation required
      if (!checkValidation(currentStep)) {
        swal("Please answer the mandatory fields first.");
        event.preventDefault();
      } else {
        currentStep = Math.max(currentStep, event.detail.to);
      }
    } else {
      stepperForm.to(currentStep + 1);
      swal("Please answer the mandatory fields first.");
      event.preventDefault();
    }
  });

  stepperFormEl.addEventListener("shown.bs-stepper", function (event) {
    currentStep = Math.max(currentStep, event.detail.to);
  });

  var btnNextList = [].slice.call(document.querySelectorAll(".btn-next-form"));
  var stepperPanList = [].slice.call(
    stepperFormEl.querySelectorAll(".bs-stepper-pane")
  );

  btnNextList.forEach(function (btn) {
    clickcount = 0;
    btn.addEventListener("click", function () {
      clickcount++;
      if (currentStep === 4) {
        if ($("#stofFactsExtra").val().trim()) {
          inputValue = $("#stofFactsExtra").val();
          lines = formatText(inputValue, 78);
          pageCount = 0;

          numOfLines = lines.split("\n").length - 1;
          if (numOfLines <= 45) {
            pageCount = 1;
          } else {
            pageCount = 1 + Math.ceil((numOfLines - 45) / 56);
          }
          anonSelection = $("input[name='page2[applicantAnon]']:checked").val();
          if ($("input[name='page2[applicantAnon]']:checked").val() === "Yes") {
            $("input[name='page8[1][date]']").val(
              moment().format("DD-MM-YYYY")
            );
            $("input[name='page8[1][title]']").val(
              "Extra pages for the Statement of Facts"
            );
            $("input[name='page8[1][desc]']").val(
              "Document to supplement further details on the facts."
            );
            $("input[name='page8[1][page]']").val(pageCount);
          } else {
            $("input[name='page8[0][date]']").val(
              moment().format("DD-MM-YYYY")
            );
            $("input[name='page8[0][title]']").val(
              "Extra pages for the Statement of Facts"
            );
            $("input[name='page8[0][desc]']").val(
              "Document to supplement further details on the facts."
            );
            $("input[name='page8[0][page]']").val(pageCount);
          }
        }
      }
      stepperForm.next();
    });
  });

  submitBtn = document.getElementById("form-submit-btn");
  submitBtn.addEventListener("click", function () {
    form.submit();
  });
});

function onValidate(groupname) {
  if (
    $("#appForm").parsley().validate({
      group: groupname,
    })
  ) {
    return true;
  } else {
    return false;
  }
}

function checkValidation(cur) {
  if (cur === 0) {
    if (onValidate("page1")) {
      return true;
    }
  } else if (cur === 1) {
    if (onValidate("page2")) {
      appVal = document.querySelector(
        "input[name='page2[applicantType]']:checked"
      ).value;
      if (appVal === "Individual") {
        if (onValidate("page2a")) {
          return true;
        }
      } else if (appVal === "Organisation") {
        if (onValidate("page2b")) {
          return true;
        }
      } else {
      }
    }
  } else if (cur === 2) {
    appVal1 = document.querySelector(
      "input[name='page2[applicantType]']:checked"
    ).value;
    if (appVal1 === "Individual") {
      if (onValidate("page3a")) {
        appVal2 = document.querySelector(
          "input[name='page3[indRepresentativeType]']:checked"
        ).value;
        if (appVal2 === "non-lawyer") {
          if (onValidate("page3b")) {
            return true;
          }
        } else if (appVal2 === "lawyer") {
          if (onValidate("page3c")) {
            return true;
          }
        } else if (appVal2 === "selfRepresented") {
          return true;
        } else {
          console.log("problem in page 3 individual validation");
        }
      }
    } else {
      if (onValidate("page3d")) {
        if (onValidate("page3e")) {
          appVal = document.querySelector(
            "input[name='page3[orgRepresentativeType]']:checked"
          ).value;
          if (appVal === "orgYesLawyer") {
            if (onValidate("page3f")) {
              return true;
            }
          }
          return true;
        }
      }
    }
  } else if (cur === 3) {
    if (onValidate("page4")) {
      return true;
    }
  } else if (cur === 4) {
    if (onValidate("page5")) {
      return true;
    }
  } else if (cur === 5) {
    if (onValidate("page6")) {
      return true;
    }
  } else if (cur === 6) {
    if (onValidate("page7a")) {
      appVal = document.querySelector(
        "input[name='page7[intInvestigation]']:checked"
      ).value;
      if (appVal === "Yes") {
        if (onValidate("page7b")) {
          return true;
        }
      } else {
        return true;
      }
    }
    if (onValidate("page7c")) {
      appVal = document.querySelector(
        "input[name='page7[prevApplications]']:checked"
      ).value;
      if (appVal === "Yes") {
        if (onValidate("page7d")) {
          return true;
        }
      } else {
        return true;
      }
    }
  } else if (cur === 7) {
    if (onValidate("page8")) {
      return true;
    }
  } else if (cur === 8) {
    if (onValidate("page9a")) {
      appVal = document.querySelector(
        "input[name='page9[signatureDeclaration]']:checked"
      ).value;
      if (appVal === "Applicant") {
        if (onValidate("page9b")) {
          return true;
        }
      } else {
        if (onValidate("page9c")) {
          return true;
        }
      }
    }
  } else if (cur === 9) {
    if (onValidate("page10")) {
      return true;
    }
  }
  return false;
}

function formatText(lines, limit, suffixLen = 3, prefixLen = 2) {
  lines = lines.split("");
  str = "";
  itrPosition = 0;

  limitCount = limit;
  flag = 0;
  inWordPos = 0;
  wordPrefix = 0;
  wordSuffix = 0;
  wordStartPos = 0;
  lines.forEach(function (ch) {
    itrPosition += 1;
    str += ch;
    limitCount -= 1;

    if (ch === "\n") {
      if (flag === 1) {
        wordSuffix = itrPosition - inWordPos;
        str =
          str.slice(0, wordStartPos) +
          "\n" +
          str.slice(wordStartPos, str.length);
        limitCount = limit - (wordPrefix + wordSuffix);
        flag = 0;
        return;
      } else {
        limitCount = limit;
        flag = 0;
        wordStartPos = itrPosition;
      }
    }

    if (flag === 1) {
      wordSuffix = itrPosition - inWordPos;
      if (wordSuffix >= suffixLen && ch != " ") {
        flag = 0;
        str =
          str.slice(0, inWordPos) + "-\n" + str.slice(inWordPos, str.length);
        itrPosition += "-\n".length;
        limitCount = limit - wordSuffix;
        wordStartPos = inWordPos + "-\n".length;
        return;
      } else if (wordSuffix <= suffixLen && ch === " ") {
        str =
          str.slice(0, wordStartPos) +
          "\n" +
          str.slice(wordStartPos, str.length);

        flag = 0;
        itrPosition += "\n".length;
        limitCount = limit - (wordSuffix + wordPrefix);
        return;
      }
    }

    if (ch === " ") {
      wordStartPos = itrPosition;
    }
    if (limitCount === 0) {
      if (ch != " ") {
        inWordPos = itrPosition;
        wordPrefix = inWordPos - wordStartPos;
        if (wordPrefix <= prefixLen) {
          str =
            str.slice(0, wordStartPos) +
            "\n" +
            str.slice(wordStartPos, str.length);
          limitCount = limit - wordPrefix;
          itrPosition += 1;
          wordStartPos += 1;
        } else {
          flag = 1;
          limitCount = limit;
        }
      } else {
        str =
          str.slice(0, itrPosition) + "\n" + str.slice(itrPosition, str.length);
        limitCount = limit;
        itrPosition += 1;
        wordStartPos += 1;
      }
    }
  });

  if (flag === 1) {
    str =
      str.slice(0, wordStartPos) + "\n" + str.slice(wordStartPos, str.length);
  }
  return str;
}
