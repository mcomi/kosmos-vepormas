function Unidades(num) {
  switch (num) {
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
