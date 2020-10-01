$(document).ready(function () {
  var popUpText = document.createElement("div");
  popUpText.style.textAlign = "justify";
  popUpText.innerHTML =
    "Attention: This is a beta version of the Just Bot's application form to the European Court of Human Rights. While it fulfils to the best of our knowledge the legal requirements of the Court for applications written in English, unknown bugs might appear during testing. Therefore, we advise that you do not currently use this form to apply to the Court; if you do so, it will be at your own risk. If you need to apply to the Court, you can fill in all the information in one of the forms provided directly by the Court <a href='https://www.echr.coe.int/Pages/home.aspx?p=applicants/ol&amp;c=' target='_blank'>here.</a> <br/><br/>The information you enter in the application form will be stored on our server until you generate the application form but will in any case be deleted each day at midnight. Your information will be automatically processed solely for the purpose of generating the application form. By proceeding to test you consent to the information you enter being stored and processed according to the conditions mentioned above.";
  swal({
    buttons: ["Go Back", "OK"],
    content: popUpText,
    closeOnClickOutside: false,
  });

  set_parameters();
});

function set_parameters() {
  var date_start_input = $("#decisionDate1");
  var date_end_input = $("#decisionDate2");
  var date_general = $(".datepicker");
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";
  var options = {
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
  };

  date_start_input.datepicker(options).on("changeDate", function (e) {
    date_end_input.datepicker("setStartDate", e.date);
  });
  date_end_input.datepicker(options).on("changeDate", function (e) {
    date_start_input.datepicker("setEndDate", e.date);
  });
  date_general.datepicker(options);
}
// Todo - change all formats to this. remove dataprovider attribute from all date fields.

// var datePickOptions = {
//   displayFormat: "ymd",
//   monthFormat: "long",
//   minYear: 1900,
//   wrapperClass: "row",
//   dropdownClass: "form-control col-sm-4",
//   allowFuture: false,
//   daySuffixes: false,
//   dayLabel: "Date",
//   defaultDateFormat: "dd-mm-yyyy",
//   submitFormat: "dd-mm-yyyy",
// };
// // var optionGlobal = $.extend({}, datePickOptions);

// $(".datepicker").on("click", function (event) {
//   $(event.currentTarget).prop("disabled", true);
//   curId = $(event.currentTarget).attr("id");
//   $("#" + curId).dropdownDatepicker(datePickOptions);
// });

// $(".input-daterange").datepicker({});
