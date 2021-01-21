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

$(document).ready(function () {
  // var popUpText = document.createElement("div");
  // popUpText.style.textAlign = "justify";
  // popUpText.innerHTML =
  //   "<b>Privacy consent</b>: The information you enter in the application form will be stored in your browser cache according to your browsers settings. It will also be stored on our server from the moment you press the button to generate the application form until midnight norwegian time, when it will be deleted automatically. Your information will be automatically processed solely for the purpose of generating the application form. By proceeding you consent to the information you enter being stored and processed according to the conditions mentioned above. For our full privacy policy, please visit <a href='#'>this link</a>.";
  // Swal.fire({
  //   showConfirmButton: true,
  //   confirmButtonText: "I consent",
  //   showCancelButton: true,
  //   cancelButtonText: "I do not consent",
  //   reverseButtons: false,
  //   html: popUpText,
  //   allowOutsideClick: false,
  //   allowEscapeKey: false,
  //   allowEnterKey: false,
  //   padding: "4rem 1.5rem 3rem 1.5rem",
  //   width: "60rem",
  //   didOpen: function (el) {
  //     cancelButton = el.children[2].children[3];
  //     cancelButton.onclick = function () {
  //       window.location.href = homeUrl;
  //     };
  //   },
  // }).then(function (result) {
  //   if (result.isConfirmed) {
  //     var popUpText = document.createElement("div");
  //     popUpText.style.textAlign = "justify";
  //     popUpText.innerHTML =
  //       "<b>Before you start writing your application form, please be advised that:</b><br/> <br/> This is a beta version of Just Bot's application form to the European Court of Human Rights. While it does fulfil, to the best of our knowledge, the legal requirements of the Court for applications written in English, unknown issues might appear while the website is in the beta version. Therefore, we advise that you do not currently use this form to apply to the Court; if you do so, it will be at your own risk. If you need to apply to the Court, you may use our digital form to understand better the process of application and generate the application form for testing purposes, but we do advise you to double check your application form against a form provided directly by the Court here. If you want to get in contact with us regarding your application, please send an email to <a href='mailto:contact@justbot.org'>contact@justbot.org </a>. <br/> <br/> For privacy reasons, this website does not include accounts, which means we do not offer the possibility of saving your application and come back to it later. If you have cleared the cache of your local browser or if the cache is cleared automatically according to the settings of your browser, you have to start writing a fresh application. We recommend you become familiar with the information you need to provide in order for your application to be complete. For this purpose you can consult the review page, where we list all the questions you need to answer and provide a description of each step in the application. <br/><br/> After you fill in this digital application form, the last step will be to generate the printable pdf containing all the information you entered on the website. You will need to sign the printed version of the application form and before you mail the application to the European Court of Human Rights, you will have to add a folder containing copies of all the documents you wish to include in order to support your claim. Some of these documents may be created within the digital application form, like the Request of Anonymity in the public documents of the Court. The documents whose text is created within our digital application form will be created as an appendix to the printable application form generated by Justbot and you will find them as the last pages of the generated application. <br/><br/> Please note: For the moment the Court accepts only applications sent by post, therefore you have to send the printed application to the European Court of Human Rights using the postal service. We provide you the address to the Court in the instruction pages. <br/><br/> Before starting to fill in the application, we recommend that you take a tour of the form on our overview page.";

  //     Swal.fire({
  //       showConfirmButton: true,
  //       confirmButtonText: "Go to the digital application form",
  //       showCancelButton: true,
  //       cancelButtonText: "Go to overview page",
  //       reverseButtons: false,
  //       html: popUpText,
  //       allowOutsideClick: false,
  //       allowEscapeKey: false,
  //       allowEnterKey: false,
  //       padding: "4rem 1.5rem 3rem 1.5rem",
  //       width: "60rem",
  //       didOpen: function (el) {
  //         cancelButton = el.children[2].children[3];
  //         cancelButton.onclick = function () {
  //           window.location.href = homeUrl;
  //         };
  //       },
  //     }).then(function (result) {
  //       if (result.isConfirmed) {
  //         Swal.fire({
  //           icon: "success",
  //           timer: 1500,
  //           showConfirmButton: false,
  //         });
  //       }
  //     });
  //   }
  // });

  set_parameters();
});

function setPageUrl() {
  window.location.href = "https://justbot.org";
}
