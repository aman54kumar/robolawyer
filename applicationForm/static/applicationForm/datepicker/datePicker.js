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
    templates: {
      leftArrow: "&lt;",
      rightArrow: "&gt;",
    },
  });

  var userTarget = "";
  var exit = false;
  $(".input-daterange").datepicker({
    format: "dd-mm-yyyy",
    weekStart: 1,
    language: "en",
    daysOfWeekHighlighted: "0,6",
    autoclose: true,
    showOnFocus: true,
    maxViewMode: "days",
    keepEmptyValues: true,
    templates: {
      leftArrow: "&lt;",
      rightArrow: "&gt;",
    },
  });
  $(".input-daterange").focusin(function (e) {
    userTarget = e.target.name;
  });
  $(".input-daterange").on("changeDate", function (e) {
    if (exit) return;
    if (e.target.name != userTarget) {
      exit = true;
      $(e.target).datepicker("clearDates");
    }
    exit = false;
  });
});
// Todo - change all formats to this. remove dataprovider attribute from all date fields.
