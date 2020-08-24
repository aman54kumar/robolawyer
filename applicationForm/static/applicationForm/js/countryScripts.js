options = {
  responsiveDropdown: true,
  preferredCountries: ["xx"],
};

// $('#indPob').countrySelect(options);
$("#indNationality").countrySelect(options);
$("#indLNationality").countrySelect(options);
$("#indNLNationality").countrySelect(options);
$("#orgnlNationality").countrySelect(options);
$("#orglNationality").countrySelect(options);

blankFlag.call(this);

$(
  "#indNationality, #indLNationality, #indNLNationality, #orgnlNationality, #orglNationality"
).on("change", blankFlag);

function blankFlag(e) {
  if ($(".flag").hasClass("xx")) {
    $(".xx").addClass("blank");
  } else {
    return false;
  }
}

// var countrySelect = function(countryID, telID) {
//   var countryData = window.intlTelInputGlobals.getCountryData(),
//     countryInput = document.querySelector(telID),
//     addressDropdown = document.querySelector(countryID);
//   var iti = window.intlTelInput(countryInput, {
//     utilsScript: 'static/appForm/intlTelInput/utils.js' // just for formatting/placeholders etc
//   });
