
$('#fecha_para').combodate();
$('#fecha_de').combodate();


$('#date-filter').click(function(e) {
  e.preventDefault()
  $('#date-search').removeClass('hidden').css('display','inline-block')
})

const solicitudesTipo = document.querySelectorAll('.scrollmenu a');

solicitudesTipo.forEach(tipo => tipo.addEventListener('click', function(){
  solicitudesTipo.forEach(tipo => {
    if(tipo.classList.contains('active')) tipo.classList.remove('active')
  });
  this.classList.add('active')
  var title = this.dataset.type
  if(title == 'dictaminada') title = 'Solicitudes dictaminadas'
  if(title == 'por-dictaminar') title = 'Solicitudes por dictaminar'
  if(title == 'complemento') title = 'Complemento solicitado'
  $('.panel-heading h4').text(title)
}))
