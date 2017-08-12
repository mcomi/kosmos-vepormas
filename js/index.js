$.fn.exists = function() {
  return this.length > 0;
}

$(function() {

  $.fn.editable.defaults.mode = 'inline';
  $('#username').editable();
});

$('#fecha_nac').combodate();
$('#fecha_nac_ca').combodate();

var inputsText = document.querySelectorAll('input')

inputsText.forEach(input => input.addEventListener('change', function() {
  if (this.value !== '')
    this.classList.add('valid')
}))

/** Formulario Solicitud **/
// agrego evento para manejar la clase valid de cada input y poner su valor debajo
const inputsSolicitud = $('#formSolicitud input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (regex.test(input.val())) { // valido el telefono
          $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

          // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
          setTimeout(function() {
            $('#loader-phone-message').addClass('hidden')
            $('#phone-message-alert').removeClass('hidden')
          }, 4000);

        } else {
          input.siblings('.input-error').html('No es un número de teléfono válido');
          input.addClass('invalid')
        }
      } else {

        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
      }
    }
  })
})
// agrego evento a los select para poner su valor debajo
const selectsSolicitud = $('#formSolicitud select')
selectsSolicitud.each(function() {
  let select = $(this)
  select.change(function() {
    if (select.val() !== '') {
      select.addClass('valid')
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
    }
  })
})

// manejo de iconos en panel collapsible
function toggleChevron(e) {
  $(e.target).prev('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
}

// $('#accordion').on('hidden.bs.collapse', toggleChevron);
// $('#accordion').on('shown.bs.collapse', toggleChevron);

$('.panel-default').on('show.bs.collapse', function() {
  $(this).addClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});

$('.panel-default').on('hide.bs.collapse', function() {
  $(this).removeClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});
// evento cuando elige co-acreditado

$("input[name='inc_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#co-acreditado-form').removeClass('hidden');
  } else {
    if (!$('#co-acreditado-form').hasClass('hidden')) {
      $('#co-acreditado-form').addClass('hidden');
    }
  }
});

// si vive en el mismo domicilio el co-acreditado copia los campos
$("input[name='domicilio_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#calle_ca').val($('#calle').val())
    $('#num_ext_ca').val($('#num_ext').val())
    $('#num_int_ca').val($('#num_int').val())
    $('#cp_ca').val($('#cp').val())
    $('#colonia_ca').val($('#colonia').val())
    $('#delegacion_ca').val($('#delegacion').val())
    $('#ciudad_ca').val($('#ciudad').val())
  }
});

// al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
$(".code-input").bind('keyup', function() {
  var indexInput = 0;
  var value = $(this).val()
  var regex = /^\d+$/
  if (regex.test(value)) {
    if (indexInput < 5)
      $(this).next().focus()
    indexInput++
  }
});

// formatea el campo de telefono

if ($('#celular').exists()) {

  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });
}

//  manejar las 2 diferentes formas para el tipo de validacion de buro
var menuHistorial = $('#historial a');
menuHistorial.each(function() {
  let menuItem = $(this)
  menuItem.click(function() {
    let consulta = menuItem.data('consulta')
    if (consulta == 'tradicional') {
      $('#consulta-tradicional').removeClass('hidden')
      $('#consulta-autenticada').addClass('hidden')
    } else {
      $('#consulta-autenticada').removeClass('hidden')
      $('#consulta-tradicional').addClass('hidden')
    }
  })

})

$("input[name='tarjeta_credito']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#ult_digitos_tarjeta').prop('disabled', false)
  } else {
    $('#ult_digitos_tarjeta').prop('disabled', true)
  }
});

//Navigation Menu Slider
$('#nav-expander').on('click', function(e) {
  e.preventDefault();
  $('body').toggleClass('nav-expanded');
});
$('.open-menu i').on('click', function(e) {
  e.preventDefault();
  $('body').toggleClass('nav-expanded');
});
$('#nav-close').on('click', function(e) {
  e.preventDefault();
  $('body').removeClass('nav-expanded');
});

// Initialize navgoco with default options
$(".main-menu").navgoco({
  caret: '<span class="caret"></span>',
  accordion: false,
  openClass: 'open',
  save: true,
  cookie: {
    name: 'navgoco',
    expires: false,
    path: '/'
  },
  slide: {
    duration: 300,
    easing: 'swing'
  }
});

$(function() {
  $('img.svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});

const infonavitButtons = `
<div class="form-group col-xs-12 col-md-4 padding-dekstop-col">

  <label class="credit-form-title">Selecciona tu crédito Infonavit</label>
  <div class="menu_credit_type">

    <div class="col-xs-3">
      <input type="radio" value="apoyo-infonavit" id="apoyo-infonavit" name="tipo-infonavit">
      <label for="apoyo-infonavit">
        <div class="icon-item">

          <img src="img/icons/apoyo-infonavit.png" alt="">
        </div>
      </label>
    </div>
    <div class="col-xs-3">
      <input type="radio" value="cofinavit" id="cofinavit" name="tipo-infonavit">
      <label for="cofinavit">
        <div class="icon-item">

          <img src="img/icons/Cofinavit.png" alt="">
        </div>
      </label>
    </div>
  </div>
</div>
`
const cofinavitForm = `
    <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
      <label for="valorInmueble">Valor del inmueble</label>
      <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
      <span class="input-success"></span>
      <span class="input-error"></span>
    </div>
    <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
      <label for="valorInmueble">Mobile numeric</label>
      <input type="tel" class="form-control validate" id="valorInmueble" placeholder="">
      <span class="input-success"></span>
      <span class="input-error"></span>
    </div>
    </div>
    <div class="row">
    <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
      <label for="valorInmueble">Valor del inmueble</label>
      <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
      <span class="input-success"></span>
      <span class="input-error"></span>
    </div>
    <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
      <label for="valorInmueble">Valor del inmueble</label>
      <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
      <span class="input-success"></span>
      <span class="input-error"></span>
    </div>
    <div class="form-group col-xs-12 col-md-4">
      <label for="valorInmueble">Plazo</label>
      <div class="input-group add-on col-xs-12">

        <div class="input-group-btn left">
          <button class="btn btn-default btn-number" data-type="minus" data-field="quant[1]"><i class="glyphicon glyphicon-minus"></i></button>
        </div>
        <input name="quant[1]" value="1 año" min="1" max="10" type="text" class="form-control validate input-number" readonly>
        <div class="input-group-btn right">
          <button class="btn btn-default btn-number" data-type="plus" data-field="quant[1]"><i class="glyphicon glyphicon-plus"></i></button>
        </div>
      </div>
      <span id="yearsSuccess" class="input-success"></span>
      <span id="yearsError" class="input-error"></span>
    </div>
`
const adquisicion_mejora_liquidez_apoyo_infonavitForm = `
  <form action="#" method="post" id="formCredits">
  <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
    <label for="valorInmueble">Valor del inmueble</label>
    <input type="tel" class="form-control validate" id="valorInmueble" name="valor_inmueble" placeholder="">
    <span class="input-success"></span>
    <span class="input-error"></span>
  </div>
  <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
    <label for="monto-credito">Monto de Crédito</label>
    <input type="tel" class="form-control validate" id="monto-credito" name="monto_credito" placeholder="">
    <span class="input-success"></span>
    <span class="input-error"></span>
  </div>

  <div class="form-group col-xs-12 col-md-4">
    <label for="valorInmueble">Plazo</label>
    <div class="input-group add-on col-xs-12">

      <div class="input-group-btn left">
        <button class="btn btn-default btn-number" data-type="minus" data-field="plazo"><i class="glyphicon glyphicon-minus"></i></button>
      </div>
      <input name="plazo" value="1 año" min="1" max="10" type="text" class="form-control validate input-number" readonly>
      <div class="input-group-btn right">
        <button class="btn btn-default btn-number" data-type="plus" data-field="plazo"><i class="glyphicon glyphicon-plus"></i></button>
      </div>
    </div>
    <span id="yearsSuccess" class="input-success"></span>
    <span id="yearsError" class="input-error"></span>
  </div>
</form>
`
const mejora_liquidezForm = `
<div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
  <label for="valorInmueble">Valor del inmueble</label>
  <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
  <span class="input-success"></span>
  <span class="input-error"></span>
</div>

</div>
<div class="row">
<div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
  <label for="valorInmueble">Valor del inmueble</label>
  <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
  <span class="input-success"></span>
  <span class="input-error"></span>
</div>
<div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
  <label for="valorInmueble">Valor del inmueble</label>
  <input type="text" class="form-control validate" id="valorInmueble" placeholder="">
  <span class="input-success"></span>
  <span class="input-error"></span>
</div>
<div class="form-group col-xs-12 col-md-4">
  <label for="valorInmueble">Plazo</label>
  <div class="input-group add-on col-xs-12">

    <div class="input-group-btn left">
      <button class="btn btn-default btn-number" data-type="minus" data-field="quant[1]"><i class="glyphicon glyphicon-minus"></i></button>
    </div>
    <input name="quant[1]" value="1 año" min="1" max="10" type="text" class="form-control validate input-number" readonly>
    <div class="input-group-btn right">
      <button class="btn btn-default btn-number" data-type="plus" data-field="quant[1]"><i class="glyphicon glyphicon-plus"></i></button>
    </div>
  </div>
  <span id="yearsSuccess" class="input-success"></span>
  <span id="yearsError" class="input-error"></span>
</div>
`

const propuestasCotizador = function(a, b, c) {
  return `
  <div class="col-md-12">
    <h1 class="title-section">Tus Opciones de Crédito</h1>
    <div id="credit-proposals swiper-container">
      <div class="credit-proposals-wrapper swiper-wrapper">

        <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
          <div class="panel panel-default panel-red">
            <div class="panel-header">
              <img src="img/icons/house-white.png" alt="">
              <span>TASA B</span>
            </div>
            <div class="panel-body">
              <p class="list-title">Valor del Inmueble</p>
              <span class="list-item">$ ${a.valor}</span>
              <p class="list-title">Monto del Crédito</p>
              <span class="list-item">$ ${a.monto}</span>
              <p class="list-title">Aforo</p>
              <span class="list-item">${a.aforo}%</span>
              <p class="list-title">Plazo en Años</p>
              <span class="list-item">${a.plazo}</span>
              <p class="list-title">Plazo en meses</p>
              <span class="list-item">${a.plazo_meses}</span>
              <p class="list-title">Tasa Anual</p>
              <span class="list-item">${a.tasa_anual}</span>
              <p class="list-title">Pago Fijo Mensual</p>
              <span class="list-item">$ ${a.pago_fijo_mensual}</span>
              <p class="list-title">Desembolso Total</p>
              <span class="list-item">$250,000</span>
              <div class="divider"></div>
              <p class="list-title">Comisión Apertura</p>
              <span class="list-item-percentage">${a.comision_apertura_porcentaje}</span>
              <span class="list-item">$ ${a.comision_apertura_cantidad}</span>
              <p class="list-title">Gastos Notariales</p>
              <span class="list-item-percentage">6%</span>
              <span class="list-item">${a.gastos_notariales}</span>
              <p class="list-title">Comisión admin</p>
              <span class="list-item">${a.comision_admin}</span>
              <p class="list-title">Avalúo</p>
              <span class="list-item">${a.avaluo}</span>
              <div class="divider"></div>

              <p class="list-title">Seguro de vida</p>
              <span class="list-item">${a.seguro_vida_mensual}</span>
              <p class="list-title">Seguro daños (mensual)</p>
              <span class="list-item">${a.seguro_danios_mensual}</span>
              <div class="divider"></div>
              <p>CAT promedio</p>
              <div class="center">
                <a href="solicitud.html" class="btn btn-form">Solicitar</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
          <div class="panel panel-default panel-green">
            <div class="panel-header">
              <img src="img/icons/house-white.png" alt="">
              <span>TASA B</span>
            </div>
            <div class="panel-body">
              <p class="list-title">Valor del Inmueble</p>
              <span class="list-item">$ ${b.valor}</span>
              <p class="list-title">Monto del Crédito</p>
              <span class="list-item">$ ${b.monto}</span>
              <p class="list-title">Aforo</p>
              <span class="list-item">${b.aforo}%</span>
              <p class="list-title">Plazo en Años</p>
              <span class="list-item">${b.plazo}</span>
              <p class="list-title">Plazo en meses</p>
              <span class="list-item">${b.plazo_meses}</span>
              <p class="list-title">Tasa Anual</p>
              <span class="list-item">${b.tasa_anual}</span>
              <p class="list-title">Pago Fijo Mensual</p>
              <span class="list-item">$ ${b.pago_fijo_mensual}</span>
              <p class="list-title">Desembolso Total</p>
              <span class="list-item">$250,000</span>
              <div class="divider"></div>
              <p class="list-title">Comisión Apertura</p>
              <span class="list-item-percentage">${b.comision_apertura_porcentaje}</span>
              <span class="list-item">$ ${b.comision_apertura_cantidad}</span>
              <p class="list-title">Gastos Notariales</p>
              <span class="list-item-percentage">6%</span>
              <span class="list-item">${b.gastos_notariales}</span>
              <p class="list-title">Comisión admin</p>
              <span class="list-item">${b.comision_admin}</span>
              <p class="list-title">Avalúo</p>
              <span class="list-item">${b.avaluo}</span>
              <div class="divider"></div>

              <p class="list-title">Seguro de vida</p>
              <span class="list-item">${b.seguro_vida_mensual}</span>
              <p class="list-title">Seguro daños (mensual)</p>
              <span class="list-item">${b.seguro_danios_mensual}</span>
              <div class="divider"></div>
              <p>CAT promedio</p>
              <div class="center">
                <a href="solicitud.html" class="btn btn-form">Solicitar</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
          <div class="panel panel-default panel-green">
            <div class="panel-header">
              <img src="img/icons/house-white.png" alt="">
              <span>TASA B</span>
            </div>
            <div class="panel-body">
              <p class="list-title">Valor del Inmueble</p>
              <span class="list-item">$ ${c.valor}</span>
              <p class="list-title">Monto del Crédito</p>
              <span class="list-item">$ ${c.monto}</span>
              <p class="list-title">Aforo</p>
              <span class="list-item">${c.aforo}%</span>
              <p class="list-title">Plazo en Años</p>
              <span class="list-item">${c.plazo}</span>
              <p class="list-title">Plazo en meses</p>
              <span class="list-item">${c.plazo_meses}</span>
              <p class="list-title">Tasa Anual</p>
              <span class="list-item">${c.tasa_anual}</span>
              <p class="list-title">Pago Fijo Mensual</p>
              <span class="list-item">$ ${c.pago_fijo_mensual}</span>
              <p class="list-title">Desembolso Total</p>
              <span class="list-item">$250,000</span>
              <div class="divider"></div>
              <p class="list-title">Comisión Apertura</p>
              <span class="list-item-percentage">${c.comision_apertura_porcentaje}</span>
              <span class="list-item">$ ${c.comision_apertura_cantidad}</span>
              <p class="list-title">Gastos Notariales</p>
              <span class="list-item-percentage">6%</span>
              <span class="list-item">${c.gastos_notariales}</span>
              <p class="list-title">Comisión admin</p>
              <span class="list-item">${c.comision_admin}</span>
              <p class="list-title">Avalúo</p>
              <span class="list-item">${c.avaluo}</span>
              <div class="divider"></div>

              <p class="list-title">Seguro de vida</p>
              <span class="list-item">${c.seguro_vida_mensual}</span>
              <p class="list-title">Seguro daños (mensual)</p>
              <span class="list-item">${c.seguro_danios_mensual}</span>
              <div class="divider"></div>
              <p>CAT promedio</p>
              <div class="center">
                <a href="solicitud.html" class="btn btn-form">Solicitar</a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>


    </div>
  </div>
  `
}
