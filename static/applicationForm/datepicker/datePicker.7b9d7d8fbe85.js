function addDatepicker() {        
  $('.datepicker').datepicker({
    weekStart: 2,
    assumeNearbyYear: true,
    autoclose: false,
    todayHighlight: true,
    clearBtn: true,
    todayHighlight: true,
  });
}

$('document').on('focus',".datepicker", function(){
  $(this).addDatepicker();
})