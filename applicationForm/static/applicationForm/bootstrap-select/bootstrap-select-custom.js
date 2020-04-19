$('.countrySelect').selectpicker({
  liveSearch: true,
  noneSelectedText: 'Select Involved State(s)',
  maxOptions: 12,
  maxOptionsText: 'Reached Maximum Limit',
  selectedTextFormat: 'values',
  actionsBox: true,
  selectOnTab: true,
  multipleSeparator: ' , ',
  style: 'btn-outline-dark',
  styleBase: 'form-control',
  virtualScroll: false,
  size: 12,
});

$(document).ready(function() {
  $('.bs-select-all').remove();
  $('.bs-deselect-all')
    .addClass('btn-info')
    .removeClass('btn-light');
});
