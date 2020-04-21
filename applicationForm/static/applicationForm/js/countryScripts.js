options = {
  defaultCountry: 'no',
  responsiveDropdown: true,
  preferredCountries: []
};

// $('#indPob').countrySelect(options);
$('#indNationality').countrySelect(options);
$('#indLNationality').countrySelect(options);
$('#indNLNationality').countrySelect(options);
$('#orgnlNationality').countrySelect(options);
$('#orglNationality').countrySelect(options);




// var countrySelect = function(countryID, telID) {
//   var countryData = window.intlTelInputGlobals.getCountryData(),
//     countryInput = document.querySelector(telID),
//     addressDropdown = document.querySelector(countryID);
//   var iti = window.intlTelInput(countryInput, {
//     utilsScript: 'static/appForm/intlTelInput/utils.js' // just for formatting/placeholders etc
//   });
