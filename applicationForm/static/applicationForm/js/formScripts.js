


var applicantTypeOption = function() {
  $("input[name='page2[applicantType]']").change(function() {
    result = this.value;
    if (result === 'Individual') {
      $('#indBeginner').removeClass('is-hidden');  
      $('#orgBeginner').addClass('is-hidden');
      $('#indRepresentative').removeClass('is-hidden');
      $('#orgRepresentative').addClass('is-hidden');
    } else if (result === 'Organisation') {
      $('#orgBeginner').removeClass('is-hidden');
      $('#indBeginner').addClass('is-hidden');
      $('#orgRepresentative').removeClass('is-hidden');
      $('#indRepresentative').addClass('is-hidden');
    } else {
      console.log('check for bug');
    }
  });
};

applicantTypeOption();

// anonymity Description
$("input[name='page2[applicantAnon]']").change(function() {
  result = this.value;

  if (result === 'Yes') {
    $('.applicantAnonReq').removeClass('is-hidden');
  } else {
    $('.applicantAnonReq').addClass('is-hidden');
  }
});
// anonymity Description End

// ___________________Page4

$("input[name='page3[indRepresentativeType]']").change(function() {
  result = this.value;
  if (result === 'lawyer') {
    $('#lawyerRep').removeClass('is-hidden');
    $('#nonLawyerRep').addClass('is-hidden');
    $('#selfRep').addClass('is-hidden');
    $('.indAuthority').removeClass('is-hidden');
  } else if (result === 'non-lawyer') {
    $('#nonLawyerRep').removeClass('is-hidden');
    $('#lawyerRep').addClass('is-hidden');
    $('#selfRep').addClass('is-hidden');
    $('.indAuthority').removeClass('is-hidden');
  } else if (result === 'selfRepresented') {
    $('#selfRep').removeClass('is-hidden');
    $('#nonLawyerRep').addClass('is-hidden');
    $('#lawyerRep').addClass('is-hidden');
    $('.indAuthority').addClass('is-hidden');
  } else {
    console.log('check for bugs');
  }
});

$("input[name='page3[orgRepresentativeType]']").change(function() {
  result = this.value;
  if (result === 'orgYesLawyer') {
    $('#orgLawyerRep').removeClass('is-hidden');
    $('.orgAuthority').removeClass('is-hidden');
  } else if (result === 'orgNoLawyer') {
    $('#orgLawyerRep').addClass('is-hidden');
    $('.orgAuthority').addClass('is-hidden');
  } else {
    console.log('check for bugs');
  }
});

//  stepper responsive

// jQuery(document).ready(function($) {
//   var alterClass = function() {
//     var ww = document.body.clientWidth;
//     if (ww < 700) {
//       $('#stepperForm').addClass('vertical');
//     } else if (ww >= 701) {
//       $('#stepperForm').removeClass('vertical');
//     }
//   };
//   $(window).resize(function() {
//     alterClass();
//   });
//   //Fire it when the page first loads:
//   alterClass();
// });





$('#page6Group').repeater({
            btnAddClass: 's-btnAdd',
            btnRemoveClass: 's-btnRemove',
            groupClass: 's-group',
            minItems: 1,
            maxItems: 0,
            startingIndex: 0,
            showMinItemsOnLoad: true,
            reindexOnDelete: true,
            repeatMode: 'append',
            animation: 'fade',
            animationSpeed: 400,
            animationEasing: 'swing',
            clearValues: true
        });

$('#page5Group').repeater({
          btnAddClass: 'a-btnAdd',
          btnRemoveClass: 'a-btnRemove',
          groupClass: 'a-group',
          minItems: 1,
          maxItems: 0,
          startingIndex: 0,
          showMinItemsOnLoad: true,
          reindexOnDelete: true,
          repeatMode: 'append',
          animation: 'fade',
          animationSpeed: 400,
          animationEasing: 'swing',
          clearValues: true
      });
// Correspondent details

$("input[name='page9[signatureDeclaration]']").change(function() {
  result = this.value;
  if (result === 'Applicant') {
    $('#correspondentOptionApplicant').removeClass('is-hidden');
    $('#correspondentOptionRepresentative').addClass('is-hidden');
  } else if (result === 'Representative') {
    $('#correspondentOptionApplicant').addClass('is-hidden');
    $('#correspondentOptionRepresentative').removeClass('is-hidden');
  } else {
    console.log('check for bugs');
  }
});

// Correcpondant details end


// Page 6 condition for text area
$("input[name='page6[appealAvailable]']").change(function() {
  result = this.value;
  if (result === 'Yes') $('.appealDescribe').removeClass('is-hidden');
  else {
    $('.appealDescribe').addClass('is-hidden');
  }
});

// Page 6 condition for text area end

// page 7 conditions for text area


$("input[name='page7[intInvestigation]']").change(function() {
  result = this.value;
  if (result === 'Yes') $('.intInvestigation').removeClass('is-hidden');
  else {
    $('.intInvestigation').addClass('is-hidden');
  }
});

$("input[name='page7[prevApplications]']").change(function() {
  result = this.value;
  if (result === 'Yes') $('.prevAppDesc').removeClass('is-hidden');
  else {
    $('.prevAppDesc').addClass('is-hidden');
  }
});

function textCounter(field, field2, maxlimit) {
  var countfield = document.getElementById(field2);
  if (field.value.length > maxlimit) {  
    if(field.id==="stofFacts"){
    swal("You have used up the allocated length for Statement of Facts. For more explanation, please use the extra provided area by clicking the button 'Do you need more writing space?'");
    }
    if(field.id==="stofFactsExtra"){
      swal("Unfortunately there is no more space available to add extra content in statement of facts according to the guidelines provided by ECtHR. Please try to modify the existing text.");
    }
    field.value = field.value.substring(0, maxlimit);
    
    return false;
  } else {
    countfield.value = maxlimit - field.value.length;
  }
}


// $("input[name='page2[applicantAnon]']").change(function(){
//   result = this.value;
//   if (result === 'Yes') {

//   }
// })

$("input[name='page2[applicantAnon]']").change(function() {
  result = this.value;
  if (result==='Yes'){
    $("input[name='page8[0][date]']").val(moment().format('DD/MM/YYYY'))
    $("input[name='page8[0][title]']").val("Anonymity Request");
    $("input[name='page8[0][desc]']").val("Request for Anonymity");
    $("input[name='page8[0][page]']").val("1");
  }
  else {
    console.log("no anonymity");
  }
});




$('#page8Group').repeater({
  btnAddClass: 'r-btnAdd',
  btnRemoveClass: 'r-btnRemove',
  groupClass: 'r-group',
  minItems: 2,
  maxItems: 24,
  startingIndex: 0,
  showMinItemsOnLoad: true,
  reindexOnDelete: true,
  repeatMode: 'append',
  animation: 'fade',
  animationSpeed: 400,
  animationEasing: 'swing',
  clearValues: true
});


limitLines = function(limit, textarea) {
  var spaces = textarea.getAttribute("cols");
  
  textarea.onkeyup = function() {
     var lines = textarea.value.split("\n");
      
     for (var i = 0; i < lines.length; i++) 
     {
           if (lines[i].length <= spaces) continue;
           var j = 0;
           
          var space = spaces;
          
          while (j++ <= spaces) 
          {
             if (lines[i].charAt(j) === " ") space = j;  
          }
      lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
      lines[i] = lines[i].substring(0, space);
    }
      if(lines.length>limit)
      {
          textarea.style.color = 'red';
          setTimeout(function(){
              textarea.style.color = '';
          },500);
      }    
     textarea.value = lines.slice(0, limit).join("\n");
  };
}


limitLines(6, document.getElementById('indAddress'));
limitLines(9, document.getElementById('orgAddress'));
limitLines(9, document.getElementById('indNLAddress'));
limitLines(9, document.getElementById('indLAddress'));
limitLines(20, document.getElementById('orgnlAddress'));
limitLines(20, document.getElementById('orglAddress'));
limitLines(16, document.getElementById('appealDescribe'));
limitLines(20, document.getElementById('intInvestigationDesc'));
limitLines(4, document.getElementById('prevAppDesc'));
limitLines(5, document.getElementById('formComments'));


