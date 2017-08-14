
$('#fecha_para').combodate();
$('#fecha_de').combodate();


$('#date-filter').click(function(e) {
  e.preventDefault()
  $('#date-search').removeClass('hidden').css('display','inline-block')
})
