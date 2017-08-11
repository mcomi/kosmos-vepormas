$.fn.exists = function(){ return this.length > 0; }

function Unidades (num) {
	switch(num){
		case 1:
			return "UN";
		case 2:
			return "DOS";
		case 3:
			return "TRES";
		case 4:
			return "CUATRO";
		case 5:
			return "CINCO";
		case 6:
			return "SEIS";
		case 7:
			return "SIETE";
		case 8:
			return "OCHO";
		case 9:
			return "NUEVE";
	}

	return "";
} //Unidades()

function Decenas(num) {

	var decena = Math.floor(num / 10);
	var unidad = num - (decena * 10);

	switch (decena) {
		case 1:
			switch (unidad) {
				case 0:
					return "DIEZ";
				case 1:
					return "ONCE";
				case 2:
					return "DOCE";
				case 3:
					return "TRECE";
				case 4:
					return "CATORCE";
				case 5:
					return "QUINCE";
				default:
					return "DIECI" + Unidades(unidad);
			}
		case 2:
			switch (unidad) {
				case 0:
					return "VEINTE";
				default:
					return "VEINTI" + Unidades(unidad);
			}
		case 3:
			return DecenasY("TREINTA", unidad);
		case 4:
			return DecenasY("CUARENTA", unidad);
		case 5:
			return DecenasY("CINCUENTA", unidad);
		case 6:
			return DecenasY("SESENTA", unidad);
		case 7:
			return DecenasY("SETENTA", unidad);
		case 8:
			return DecenasY("OCHENTA", unidad);
		case 9:
			return DecenasY("NOVENTA", unidad);
		case 0:
			return Unidades(unidad);
	}
} //Unidades()

function DecenasY(strSin, numUnidades) {
	if (numUnidades > 0)
		return strSin + " Y " + Unidades(numUnidades)

	return strSin;
} //DecenasY()

function Centenas(num) {
	var centenas = Math.floor(num / 100);
	var decenas = num - (centenas * 100);

	switch (centenas) {
		case 1:
			if (decenas > 0)
				return "CIENTO " + Decenas(decenas);
			return "CIEN";
		case 2:
			return "DOSCIENTOS " + Decenas(decenas);
		case 3:
			return "TRESCIENTOS " + Decenas(decenas);
		case 4:
			return "CUATROCIENTOS " + Decenas(decenas);
		case 5:
			return "QUINIENTOS " + Decenas(decenas);
		case 6:
			return "SEISCIENTOS " + Decenas(decenas);
		case 7:
			return "SETECIENTOS " + Decenas(decenas);
		case 8:
			return "OCHOCIENTOS " + Decenas(decenas);
		case 9:
			return "NOVECIENTOS " + Decenas(decenas);
	}

	return Decenas(decenas);
} //Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
	var cientos = Math.floor(num / divisor)
	var resto = num - (cientos * divisor)

	var letras = "";

	if (cientos > 0)
		if (cientos > 1)
			letras = Centenas(cientos) + " " + strPlural;
		else
			letras = strSingular;

	if (resto > 0)
		letras += "";

	return letras;
} //Seccion()

function Miles(num) {
	var divisor = 1000;
	var cientos = Math.floor(num / divisor)
	var resto = num - (cientos * divisor)

	var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
	var strCentenas = Centenas(resto);

	if (strMiles == "")
		return strCentenas;

	return strMiles + " " + strCentenas;
} //Miles()

function Millones(num) {
	var divisor = 1000000;
	var cientos = Math.floor(num / divisor)
	var resto = num - (cientos * divisor)

	var strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
	var strMiles = Miles(resto);

	if (strMillones == "")
		return strMiles;

	return strMillones + " " + strMiles;
} //Millones()

function NumeroALetras(num) {
	var data = {
		numero: num,
		enteros: Math.floor(num),
		centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
		letrasCentavos: "",
		letrasMonedaPlural: 'PESOS', //"PESOS", 'Dólares', 'Bolívares', 'etcs'
		letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

		letrasMonedaCentavoPlural: "CENTAVOS",
		letrasMonedaCentavoSingular: "CENTAVO"
	};

	if (data.centavos > 0) {
		data.letrasCentavos = "CON " + (function() {
			if (data.centavos == 1)
				return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
			else
				return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
			}
		)();
	};

	if (data.enteros == 0)
		return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
	if (data.enteros == 1)
		return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
	else
		return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
	}
//NumeroALetras()


$(function(){

  $.fn.editable.defaults.mode = 'inline';
  $('#username').editable();
});


$('#fecha_nac').datepicker({
    language: "es",
    orientation: "bottom auto"
});

// Capitalizar la primera letra
function jsUcfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// inputs para incrementar o reducir el valor con iconos

const optionsCredits = document.querySelectorAll('.scrollmenu a');

function handleLoadForm() {
	// manejar estilos de seccion activa
	optionsCredits.forEach(option => {
		if(option.classList.contains('active')) option.classList.remove('active')
	});
	this.classList.add('active')
	const type = this.dataset.type || ''
	// div donde coloco los formularios dependiendo del tipo de credito
	const formCotizador = document.getElementById('form-cotizador')
	/** casos tipos de credito **/
	if(type=='infonavit'){
		// cargo las opciones de infonavit
		formCotizador.innerHTML = infonavitButtons;
		// inicilizo los eventos para escoger que tipo de credito infonavit
		const tiposInfonavit = document.querySelectorAll('.menu_credit_type input[type="radio"]');
		tiposInfonavit.forEach(tipo => tipo.addEventListener('click', function () {
			console.log(tipo.value);
			if(tipo.value==='apoyo-infonavit'){
				var temp = document.createElement('div');

				temp.innerHTML = adquisicion_mejora_liquidez_apoyo_infonavitForm;
				formCotizador.appendChild(temp);
			}
		} ));
	}
	if(type=='adquisicion' || type=='mejora' || type=='liquidez'){
		formCotizador.innerHTML = adquisicion_mejora_liquidez_apoyo_infonavitForm;
	}
	if(type=='mejora-liquidez'){
		formCotizador.innerHTML = mejora_liquidezForm;
	}

	const valorInmueble = document.getElementById('valorInmueble');

	valorInmueble.addEventListener('keyup', function() {
		valorInmueble.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(valorInmueble.value).toLowerCase());
	})

	var inputsText = document.querySelectorAll('input')

	inputsText.forEach(input => input.addEventListener('change', function () {
	  if(this.value !== '')
	    this.classList.add('valid')
	}))

	$('.btn-number').click(function(e) {
		e.preventDefault();

		var fieldName = $(this).attr('data-field');
		var type = $(this).attr('data-type');
		var input = $("input[name='" + fieldName + "']");
		var trimNumber = input.val().replace(/^\D+/g, '');
		var currentVal = parseInt(trimNumber);
		var newValue = null;
		var year = null;
		if (!isNaN(currentVal)) {
			if (type == 'minus') {
				if (currentVal > input.attr('min')) {
					newValue = currentVal - 1
					year = newValue == 1
						? ' año'
						: ' años';
					input.val(newValue + year).change();
					document.getElementById('yearsSuccess').innerHTML = newValue + year;
				}
				if (parseInt(input.val()) == input.attr('min')) {
					$(this).attr('disabled', true);
				}

			} else if (type == 'plus') {

				if (currentVal < input.attr('max')) {
					newValue = currentVal + 1
					year = newValue == 1
						? ' año'
						: ' años';
					input.val(newValue + year).change();
					document.getElementById('yearsSuccess').innerHTML = newValue + year;
				}
				if (parseInt(input.val()) == input.attr('max')) {
					$(this).attr('disabled', true);
				}

			}
		} else {
			input.val(0);
		}
	});

	/** Eventos y acciones para calcular y mostrar las propuestas **/
	const inputs = $('form#formCredits input');

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

	inputs.change(function() {
  if (validateInputs(inputs)) {
    console.log('se lleno la forma, calculo propuestas');
		const datos = {}; // obj donde mando agrupo los datos de la forma
		inputs.each(function() {
	    let input = $(this);

			datos[input.attr('name')] = input.val()
	  });

		// mando los datos para calcular y llenar el template de propuestas
		calculoYMuestroPropuestas(datos)
  }
});

}

optionsCredits.forEach(option => option.addEventListener('click', handleLoadForm));

// calculo y muestro las propuestas calculadas
function calculoYMuestroPropuestas (datos) {

	const tasaA = tasasAdquisicionMejoraLiquidezApoyoInfonavit.tasaA;
	const tasaB = tasasAdquisicionMejoraLiquidezApoyoInfonavit.tasaB;
	const tasaC = tasasAdquisicionMejoraLiquidezApoyoInfonavit.tasaC;

	const propuestaA = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaA.tasa_anual, tasaA.comision_apertura_porcentaje, tasaA.comision_admin, tasaA.avaluo)
	const propuestaB = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaB.tasa_anual, tasaB.comision_apertura_porcentaje, tasaB.comision_admin, tasaB.avaluo)
	const propuestaC = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaC.tasa_anual, tasaC.comision_apertura_porcentaje, tasaC.comision_admin, tasaC.avaluo)

	console.log(propuestaA, propuestaB, propuestaC);
	const divPropuestas = document.getElementById('propuestas-cotizador');

	divPropuestas.innerHTML = propuestasCotizador(propuestaA, propuestaB, propuestaC)
}

function Propuesta(valor, monto, plazo, tasa_anual, comision_apertura_porcentaje, comision_admin, avaluo) {
		this.valor = valor;
		this.monto = monto;
		this.plazo = plazo.match(/[0-9]+/g)[0]
		this.tasa_anual = tasa_anual;
		this.comision_apertura_porcentaje = comision_apertura_porcentaje;
		this.comision_admin = comision_admin;
		this.avaluo = avaluo
		this.aforo = this.monto/this.valor;
		this.plazo_meses = this.plazo*12;
		//TODO tasa_anual, gastos_notariales_porcentaje, plazo_meses, monto_credito
		this.pago_fijo_mensual = 10000;
		this.comision_apertura_cantidad = (this.comision_apertura_porcentaje/10)*this.monto
		this.gastos_notariales = this.monto*0.06;
		this.seguro_vida_mensual = this.monto * (0.27/1000);
		this.seguro_danios_mensual = (monto*0.8)*(0.34916/1000);
		this.seguro_danios_mensual + this.seguro_vida_mensual + this.pago_fijo_mensual + this.comision_admin;
		this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
	}


var tasasAdquisicionMejoraLiquidezApoyoInfonavit = {
	'tasaA' : {
		'tasa_anual': 11.30,
		'comision_apertura_porcentaje': 1,
		'comision_admin': 374,
		'avaluo': 1500,
	},
	'tasaB' : {
		'tasa_anual': 12.30,
		'comision_apertura_porcentaje': 1.50,
		'comision_admin': 374,
		'avaluo': 1500,
	},
	'tasaC' : {
		'tasa_anual': 13,
		'comision_apertura_porcentaje': 2,
		'comision_admin': 374,
		'avaluo': 1500,
	}
}



$(".input-number").keydown(function(e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.keyCode, [
		46,
		8,
		9,
		27,
		13,
		190
	]) !== -1 ||
	// Allow: Ctrl+A
	(e.keyCode == 65 && e.ctrlKey === true) ||
	// Allow: home, end, left, right
	(e.keyCode >= 35 && e.keyCode <= 39)) {
		// let it happen, don't do anything
		return;
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
});

var swiper = new Swiper('.swiper-container');

var checkScroll = function(evt){
	console.log(evt)
    var $slide = $(this),
        scrollTop = $slide.scrollTop();
    if (scrollTop > 0 && (scrollTop + $slide.height()) < $slide[0].scrollHeight) {
        evt.stopPropagation();
    }
};

if ($('.swiper-slide').exists()) {
  $('.swiper-slide').on('touchmove', checkScroll);

}


/** Formulario Solicitud **/
// agrego evento para manejar la clase valid de cada input y poner su valor debajo
const  inputsSolicitud = $('#formSolicitud input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if(input.val() !== ''){
      if(input.attr('id')==='celular') {  // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(regex.test(input.val())){  // valido el telefono
          $('#loader-phone-message').removeClass('hidden')  // si pasa se muestra loader

          // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
          setTimeout(function(){
             $('#loader-phone-message').addClass('hidden')
              $('#phone-message-alert').removeClass('hidden')
            }, 4000);

        }else{
          input.siblings('.input-error').html('No es un número de teléfono válido');
          input.addClass('invalid')
        }
      }
      else{

        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
      }
    }
  })
})
// agrego evento a los select para poner su valor debajo
const  selectsSolicitud = $('#formSolicitud select')
selectsSolicitud.each(function() {
  let select = $(this)
  select.change(function() {
    if(select.val() !== ''){
      select.addClass('valid')
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
    }
  })
})

// manejo de iconos en panel collapsible
function toggleChevron(e) {
    $(e.target)
            .prev('.panel-heading')
            .find("i")
            .toggleClass('fa-minus fa-plus');
}

// $('#accordion').on('hidden.bs.collapse', toggleChevron);
// $('#accordion').on('shown.bs.collapse', toggleChevron);

$('.panel-default').on('show.bs.collapse', function() {
    $(this).addClass('active');
    $(this).find('.panel-heading')
    .find("i")
    .toggleClass('fa-minus fa-plus');
});

$('.panel-default').on('hide.bs.collapse', function() {
    $(this).removeClass('active');
    $(this).find('.panel-heading')
    .find("i")
    .toggleClass('fa-minus fa-plus');
});
// evento cuando elige co-acreditado

$("input[name='inc_acreditado']").click(function() {
    if($(this).prop('value')=='si'){
      $('#co-acreditado-form').removeClass('hidden');
    }
    else{
      if(!$('#co-acreditado-form').hasClass('hidden')){
        $('#co-acreditado-form').addClass('hidden');
      }
    }
});

// si vive en el mismo domicilio el co-acreditado copia los campos
$("input[name='domicilio_acreditado']").click(function() {
    if($(this).prop('value')=='si'){
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
$(".code-input").bind('keyup', function () {
    var indexInput = 0;
    var value = $(this).val()
    var regex = /^\d+$/
    if(regex.test(value)){
      if(indexInput<5)
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
menuHistorial.each(function(){
  let menuItem = $(this)
  menuItem.click(function() {
    let consulta = menuItem.data('consulta')
    if(consulta=='tradicional'){
      $('#consulta-tradicional').removeClass('hidden')
      $('#consulta-autenticada').addClass('hidden')
    }else{
      $('#consulta-autenticada').removeClass('hidden')
      $('#consulta-tradicional').addClass('hidden')
    }
  })

})

$("input[name='tarjeta_credito']").click(function() {
    if($(this).prop('value')=='si'){
      $('#ult_digitos_tarjeta').prop('disabled',false)
    }else{
      $('#ult_digitos_tarjeta').prop('disabled',true)
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


$(function(){
    $('img.svg').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
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

const propuestasCotizador = function(a,b,c){
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
              <span class="list-item">$ ${ a.pago_fijo_mensual }</span>
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
              <span class="list-item">$ ${ b.pago_fijo_mensual }</span>
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
              <span class="list-item">$ ${ c.pago_fijo_mensual }</span>
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
