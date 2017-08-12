var valid = true;

// if($(document).width() < 767/*pixels*/){
//             // Not a phone nor a tablet
//     $("a.collapsed").attr("data-toggle", ""); // does not collapse
//     $("a.collapsed").attr("data-target", ""); // does not even have a target to collapse
// }
var step = 'datos-personales';
$('.nav-btn').on('click', function(e) {
  e.preventDefault()

  $(this).closest('.collapse').collapse('hide')
  $(this).closest('.panel').hide()
  step = $(this).closest('.panel').next().find('.collapse').attr('id')
  $(this).closest('.panel').next().show()
  $(this).closest('.panel').next().find('.collapse').collapse('show')

})

$('.nav-btn-back').on('click', function(e) {
  e.preventDefault()
  if(step == 'datos-personales'){
     window.location.href = "simulador.html";
  }else{
    $('#'+step).collapse('hide')
    $('#'+step).closest('.panel').hide()
    $('#'+step).closest('.panel').prev().show()
    $('#'+step).closest('.panel').prev().find('.collapse').collapse('show')
  }

})

$('a[data-toggle]').on('click', function(e) {
  console.log($(this))
  // Panel that is currently open
  var panel = $('div.in');
  if (!valid) {
    alert('Sorry panel ' + panel[0].id + ' not validated');
    e.stopPropagation();
  }
});

// valida
function checkInputs() {
  var isValid = true;
  $('input').each(function() {
    if ($(this).val() === '') {
      $('#confirm').prop('disabled', true)
      isValid = false;
      return false;
    }
  });
  if(isValid) {$('#confirm').prop('disabled', false)}
  return isValid;
}

const validateInputs = function (inputs) {
  var validForm = true;

  inputs.each(function(index) {
    let input = $(this);

    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      console.log('No se han llenado todos los campos');
      validForm = false;
    }
  });
  return validForm;
}
