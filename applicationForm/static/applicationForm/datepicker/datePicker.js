$(document).ready(function () {
  var popUpText = document.createElement("div");
  popUpText.style.textAlign = "justify";
  popUpText.innerHTML =
    "Attention: This is a beta version of the Just Bot's application form to the European Court of Human Rights. While the form is theoretically fulfilling the legal requirements of the Court for applications written in English, during the beta testing unknown bugs might appear. We do not advise you to use this form to apply to the Court at the moment; if you do so, it will be at your own risk. If you need to apply to the Court, you can fill in all the information in one of the forms provided directly by the Court <a href='https://www.echr.coe.int/Pages/home.aspx?p=applicants/ol&amp;c='>here.</a> <br/><br/>The information you enter in the application form will be stored on our server until you generate the application form or until midnight if you do not generate the application from. Your information will be automatically processed solely for the purpose of generating the application form. By proceeding you consent to your information being stored and processed according to the conditions mentioned above.";
  swal({
    buttons: ["Go Back", "OK"],
    content: popUpText,
    closeOnClickOutside: false,
  });

  $(".datepicker").datepicker({
    weekStart: 1,
    daysOfWeekHighlighted: "0,6",
    assumeNearbyYear: true,
    autoclose: true,
    todayHighlight: true,
    clearBtn: true,
    showOnFocus: true,
    maxViewMode: "days",
    format: "dd-mm-yyyy",
    orientation: "top left",
    templates: {
      leftArrow: "&lt;",
      rightArrow: "&gt;",
    },
  });

  set_parameters();
});

function set_parameters() {
  var date_start_input = $("#decisionDate1");
  var date_end_input = $("#decisionDate2");
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";

  var options = {
    container: container,
    todayHighlight: true,
    autoclose: true,
    orientation: "top left",
    format: "dd-mm-yyyy",
    weekStart: 1,
    language: "en",
    daysOfWeekHighlighted: "0,6",
    showOnFocus: true,
    maxViewMode: "days",
    templates: {
      leftArrow: "&lt;",
      rightArrow: "&gt;",
    },
  };

  date_start_input.datepicker(options).on("changeDate", function (e) {
    date_end_input.datepicker("setStartDate", e.date);
  });
  date_end_input.datepicker(options).on("changeDate", function (e) {
    date_start_input.datepicker("setEndDate", e.date);
  });
}

// Todo - change all formats to this. remove dataprovider attribute from all date fields.
