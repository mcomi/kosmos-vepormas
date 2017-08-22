$.fn.editable.defaults.mode = 'inline';
$('#username').editable()
$('#name').editable()
$('#work').editable()
$('#email').editable()

$('#btn-cambia-pass').click( function() {
  $('#cambiar-contrasenia').removeClass('hidden');
  $('#btn-cambia-pass').addClass('hidden')
})

$('#change-pass').click(function() {
  $('#alert-change-pass').removeClass('hidden')
  $('#cambiar-contrasenia').addClass('hidden');
  $('#btn-cambia-pass').removeClass('hidden')
})
