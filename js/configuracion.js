$('#canal').change(function(){
  if($(this).val()==='3'){
    $('#brokers').removeClass('hidden')
    $('#subbrokers').removeClass('hidden')
  }
})

$('#region').change(function(){
    $('#estados').removeClass('hidden')
})
