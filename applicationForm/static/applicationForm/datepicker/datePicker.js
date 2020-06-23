$(document).ready(function () {
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
