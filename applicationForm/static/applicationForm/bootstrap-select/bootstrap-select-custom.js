// made a change in parsley.js to remove a warning for these custom checkbox.
// warning: "To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option"

$(".countrySelect").bsMultiSelect2({
  useCssPatch: true, // default, can be ommitted
  cssPatch: {
    choices: {
      columnCount: "3",
      listStyleType: "none",
    },
    choice: "px-md-2 px-1", // classes!
    choice_hover: "text-primary bg-light",
    choiceLabel_disabled: {
      opacity: ".65",
    },
    choiceCheckBox: "countryChoice",
    picks: {
      listStyleType: "none",
      display: "flex",
      flexWrap: "wrap",
      height: "auto",
      marginBottom: "0",
    },
    picks_focus: {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
    picks_def: {
      minHeight: "calc(2.25rem + 2px)",
    },
    picks_lg: {
      minHeight: "calc(2.875rem + 2px)",
    },
    picks_sm: {
      minHeight: "calc(1.8125rem + 2px)",
    },
    pick: {
      styles: {
        paddingLeft: "0.2em",
        paddingRight: "0.2em",
        margin: "0.3em",
      },
      classes: "badge badge-pill badge-warning",
    },
    pickContent: {
      paddingRight: "10px",
      paddingLeft: "10px",
      fontSize: "1.2em",
    },
    pickButton: {
      fontSize: "2em",
      lineHeight: ".9em",
      float: "none",
    },
    filterInput: {
      border: "0px",
      height: "auto",
      boxShadow: "none",
      padding: "0",
      margin: "0",
      outline: "none",
      backgroundColor: "transparent",
    },
  },
  placeholder: "Select Involved State(s)",
  staticContentGenerator: null,
  getLabelElement: null,
  pickContentGenerator: null,
  choiceContentGenerator: null,
  buildConfiguration: null,
  isRtl: null,
  setSelected: null,
  required: null,
  optionsAdapter: null,
  options: null,
  getDisabled: null,
  getSize: null,
  getValidity: null,
  labelElement: null,
  valueMissingMessage: "",
  getIsValueMissing: null,
  // updateData:
});
