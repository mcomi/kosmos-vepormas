$.fn.exists = function() {
  return this.length > 0;
}

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

  function formatCurrency() {
    //number-format the user input
    this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatCurrencyOfNumber(cantidad) {
    //number-format the user input
    if(typeof cantidad === 'string')
      return parseFloat(cantidad.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else {
      return cantidad.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  // inputs para incrementar o reducir el valor con iconos

  const optionsCredits = document.querySelectorAll('.scrollmenu a');

  function handleLoadForm() {
  	// manejar estilos de seccion activa
  	optionsCredits.forEach(option => {
  		if(option.classList.contains('active')) option.classList.remove('active')
  	});
  	this.classList.add('active')
    divPropuestas.innerHTML = '' // quito propuestas si cambia de menu
  	const type = this.dataset.type || ''
  	// div donde coloco los formularios dependiendo del tipo de credito
  	const formCotizador = document.getElementById('form-cotizador')
  	/** casos tipos de credito **/
  	if(type=='infonavit'){
  		// cargo las opciones de infonavit
  		formCotizador.innerHTML = infonavitForm;
      const valorInmueble = document.getElementById('valorInmueble');
      const montoCreditoCofi = document.getElementById('montoCredito');
      const saldo_subcuenta = document.getElementById('saldo_subcuenta');
      const pago_fijo_infonavit = document.getElementById('pago_fijo_infonavit');
      const gastos_infonavit = document.getElementById('gastos_infonavit');
      const monto_credito = document.getElementById('monto-credito');
      const plazo = document.getElementById('plazo');

      const inputsTypeInfonavit = document.querySelectorAll('.input-infonavit')

      inputsTypeInfonavit.forEach(input => input.addEventListener('keyup', function(){
        this.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(this.value).toLowerCase());
      }));

      valorInmueble.addEventListener('change',formatCurrency)
      montoCredito.addEventListener('change',formatCurrency)
      monto_credito.addEventListener('change', formatCurrency)
      saldo_subcuenta.addEventListener('change',formatCurrency)
      pago_fijo_infonavit.addEventListener('change',formatCurrency)
      gastos_infonavit.addEventListener('change',formatCurrency)

      valorInmueble.addEventListener('change',validetInfonavitInpus)
      montoCredito.addEventListener('change',validetInfonavitInpus)
      monto_credito.addEventListener('change', validetInfonavitInpus)
      saldo_subcuenta.addEventListener('change',validetInfonavitInpus)
      pago_fijo_infonavit.addEventListener('change',validetInfonavitInpus)
      gastos_infonavit.addEventListener('change',validetInfonavitInpus)

  		// inicilizo los eventos para escoger que tipo de credito infonavit
  		const tiposInfonavit = document.querySelectorAll('.menu_credit_type input[type="radio"]');
      let tipoActivo = null;
  		tiposInfonavit.forEach(tipo => tipo.addEventListener('click', function () {
        $('#infonavitCredits')[0].reset()
        $('#infonavitCredits .input-success').html('')
  			if(tipo.value==='apoyo-infonavit'){
          tipoActivo = tipo.value
          if($('.info-cofi').hasClass('hidden')) $('.info-cofi').removeClass('hidden');
          if(!$('.cofinavit').hasClass('hidden')) $('.cofinavit').addClass('hidden');
          $('.infonavit').removeClass('hidden');

  			}
        if(tipo.value==='cofinavit'){
          tipoActivo = tipo.value
          if($('.info-cofi').hasClass('hidden')) $('.info-cofi').removeClass('hidden');
          if(!$('.infonavit').hasClass('hidden')) $('.infonavit').addClass('hidden');
          $('.cofinavit').removeClass('hidden');
  			}
  		} ));

      function validetInfonavitInpus () {
          if(tipoActivo==='apoyo-infonavit'){
            if(valorInmueble.value != '' && monto_credito.value != ''){
              console.log('calculo propuesta infonavit');
              var datos = {}
              datos.valor_inmueble = valorInmueble.value
              datos.monto_credito = monto_credito.value
              datos.plazo = plazo.value
              calculoYMuestroPropuestas(datos)
            }
          }
          if(tipoActivo==='cofinavit'){
            if(valorInmueble.value != '' && montoCredito.value != ''
              && saldo_subcuenta.value!= '' && pago_fijo_infonavit.value != ''
                && gastos_infonavit.value != ''){
                  console.log('calculo propuesta cofinavit');
            }
          }
      }


  	}
  	if(type=='adquisicion' || type=='mejora' || type=='liquidez'){
  		formCotizador.innerHTML = adquisicion_mejora_liquidez_apoyo_infonavitForm;
      const valorInmueble = document.getElementById('valorInmueble');
      const montoCredito = document.getElementById('monto-credito');

    	valorInmueble.addEventListener('keyup', function() {
    		valorInmueble.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(valorInmueble.value).toLowerCase());
    	})
      montoCredito.addEventListener('keyup', function() {
    		montoCredito.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(montoCredito.value).toLowerCase());
    	})


      valorInmueble.addEventListener('change',formatCurrency)
      montoCredito.addEventListener('change',formatCurrency)
  	}
  	if(type=='mejora-liquidez'){
  		formCotizador.innerHTML = mejora_liquidezForm;
      const valorInmueble = document.getElementById('valor');
      const montoCredito = document.getElementById('monto_solicitado');
      const saldo = document.getElementById('saldo_restante');

    	valorInmueble.addEventListener('keyup', function() {
    		valorInmueble.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(valorInmueble.value).toLowerCase());
    	})
      montoCredito.addEventListener('keyup', function() {
    		montoCredito.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(montoCredito.value).toLowerCase());
    	})
      saldo.addEventListener('keyup', function() {
    		saldo.nextElementSibling.innerHTML = jsUcfirst(NumeroALetras(saldo.value).toLowerCase());
    	})


      valorInmueble.addEventListener('change',formatCurrency)
      montoCredito.addEventListener('change',formatCurrency)
      saldo.addEventListener('change',formatCurrency)

      const inputs = $('form#formMejora input');

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
    		calculoYMuestroPropuestasML(datos)
      }
    });
  	}




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

  	/** Eventos y acciones para calcular y mostrar las propuestas mejora,infonavit,liquidez**/
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

  const divPropuestas = document.getElementById('propuestas-cotizador');
  optionsCredits.forEach(option => option.addEventListener('click', handleLoadForm));

  // calculo y muestro las propuestas AMLAI
  function calculoYMuestroPropuestas (datos) {

  	const tasaA = objTasas.tasaA;
  	const tasaB = objTasas.tasaB;
  	const tasaC = objTasas.tasaC;

  	const propuestaA = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaA.tasa_anual, tasaA.comision_apertura_porcentaje, tasaA.comision_admin, tasaA.avaluo)
  	const propuestaB = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaB.tasa_anual, tasaB.comision_apertura_porcentaje, tasaB.comision_admin, tasaB.avaluo)
  	const propuestaC = new Propuesta(datos.valor_inmueble, datos.monto_credito, datos.plazo, tasaC.tasa_anual, tasaC.comision_apertura_porcentaje, tasaC.comision_admin, tasaC.avaluo)

  	divPropuestas.innerHTML = propuestasAMLAI(propuestaA, propuestaB, propuestaC)
  }

    function Propuesta(valor, monto, plazo, tasa_anual, comision_apertura_porcentaje, comision_admin, avaluo) {
    		this.valor = parseFloat(valor.replace(/,/g, ''));
    		this.monto = parseFloat(monto.replace(/,/g, ''));
    		this.plazo = plazo.match(/[0-9]+/g)[0]
    		this.tasa_anual = tasa_anual;
    		this.comision_apertura_porcentaje = comision_apertura_porcentaje;
    		this.comision_admin = comision_admin;
    		this.avaluo = avaluo
        this.enganche = this.valor - this.monto;
    		this.aforo = this.monto/this.valor * 100;
    		this.plazo_meses = this.plazo*12;
    		//TODO tasa_anual, gastos_notariales_porcentaje, plazo_meses, monto_credito
    		this.pago_fijo_mensual = 10000;
    		this.comision_apertura_cantidad = (this.comision_apertura_porcentaje/10)*this.monto
    		this.gastos_notariales = this.monto*0.06;
        this.gastos_originacion = this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
        this.desembolso_inicial = this.enganche + this.gastos_originacion;
    		this.seguro_vida_mensual = this.monto * (0.27/1000);
    		this.seguro_danios_mensual = (this.monto*0.8)*(0.34916/1000);
    		this.pago_mensual_total + this.seguro_vida_mensual + this.pago_fijo_mensual + this.comision_admin;
    		this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
        this.ingreso_mensual_requerido = this.pago_fijo_mensual/0.3
    	}

    function calculoYMuestroPropuestasML (datos) {

      	const tasaA = objTasas.tasaA;
      	const tasaB = objTasas.tasaB;
      	const tasaC = objTasas.tasaC;

      	const propuestaA = new PropuestaMejoraLiquidez(datos.valor, datos.saldo_restante, datos.monto_solicitado, datos.plazo,
          tasaA.tasa_anual, tasaA.comision_apertura_porcentaje, tasaA.comision_admin, tasaA.avaluo,
          tasaA.tasa_anual_liquidez)
      	const propuestaB = new PropuestaMejoraLiquidez(datos.valor, datos.saldo_restante, datos.monto_solicitado, datos.plazo,
          tasaB.tasa_anual, tasaB.comision_apertura_porcentaje, tasaB.comision_admin, tasaB.avaluo,
          tasaB.tasa_anual_liquidez)
      	const propuestaC = new PropuestaMejoraLiquidez(datos.valor, datos.saldo_restante, datos.monto_solicitado, datos.plazo,
          tasaC.tasa_anual, tasaC.comision_apertura_porcentaje, tasaC.comision_admin, tasaC.avaluo,
          tasaC.tasa_anual_liquidez)

      	divPropuestas.innerHTML = propuestasMejoraLiquidez(propuestaA, propuestaB, propuestaC)
      }

    function PropuestaMejoraLiquidez(valor, saldo_restante, monto, plazo,
      tasa_anual, comision_apertura_porcentaje, comision_admin, avaluo,
      tasa_anual_liquidez) {
    		this.valor = parseFloat(valor.replace(/,/g, ''));
        this.saldo_restante = parseFloat(saldo_restante.replace(/,/g, ''));
    		this.monto_solicitado = parseFloat(monto.replace(/,/g, ''));
        this.plazo = plazo.match(/[0-9]+/g)[0]
        this.aforo = this.saldo_restante/this.valor * 100
        this.aforo_maximo = 90
        this.spread_aforo = this.aforo_maximo - this.aforo
        this.monto_maximo = this.spread_aforo * this.valor
        this.aforo_total = (this.saldo_restante + this.monto_solicitado) / this.valor
        this.plazo_meses = this.plazo*12
    		this.tasa_anual = tasa_anual
        this.tasa_anual_liquidez = tasa_anual_liquidez
    		this.comision_apertura_porcentaje = comision_apertura_porcentaje;
    		this.comision_admin = comision_admin;
    		this.avaluo = avaluo
        this.enganche = this.valor - this.monto_solicitado;
    		//TODO tasa_anual, gastos_notariales_porcentaje, plazo_meses, monto_credito
    		this.pago_fijo_mensual_liquidez = 10000;
        this.seguro_vida_liquidez = (0.27/1000)*this.monto_solicitado
        this.pago_mensual_liquidez = this.pago_fijo_mensual_liquidez + this.seguro_vida_liquidez
        this.pago_fijo_mensual_mejora = 10000 //TODO excel PAGO
    		this.comision_apertura_cantidad = this.saldo_restante+this.monto_solicitado*(this.comision_apertura_porcentaje*100)
    		this.gastos_notariales = (this.saldo_restante+this.monto_solicitado)*0.06;
    		this.seguro_vida_mensual = this.saldo_restante * (0.27/1000); //mejora
        this.gastos_originacion = this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
    		this.seguro_danios_mensual = (this.saldo_restante*0.8)*(0.34916/1000); //mejora
        this.pago_mensual_total_mejora = this.seguro_vida_mensual + this.pago_fijo_mensual_mejora + this.seguro_danios_mensual
    		this.pago_mensual_total = this.pago_mensual_liquidez + this.pago_fijo_mensual_mejora + this.comision_admin
          + this.seguro_vida_mensual + this.seguro_danios_mensual + this.pago_mensual_total_mejora
    		this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
        this.ingreso_mensual_requerido = (this.pago_fijo_mensual_mejora+this.pago_fijo_mensual_liquidez)/0.3
    	}
      function PropuestaCofinavit(valor, monto, plazo, tasa_anual, comision_apertura_porcentaje, comision_admin, avaluo, tasa_anual_liquidez, saldo_subcuenta, pago_fijo_infonavit, gastos_infonavit) {
      		this.valor = parseFloat(valor.replace(/,/g, ''));
      		this.monto = parseFloat(monto.replace(/,/g, ''));
          this.saldo_restante = saldo_restante
          this.aforo_maximo
          this.spread_aforo
          this.monto_maximo
          this.monto_solicitado
          this.aforo_total
          this.saldo_subcuenta = saldo_subcuenta === undefined ? 0 : parseFloat(saldo_subcuenta.replace(/,/g, ''))
          this.pago_fijo_infonavit = pago_fijo_infonavit === undefined ? 0 : parseFloat(pago_fijo_infonavit.replace(/,/g, ''));
          this.gastos_infonavit = gastos_infonavit === undefined ? 0 : parseFloat(gastos_infonavit.replace(/,/g, ''));
      		this.plazo = plazo.match(/[0-9]+/g)[0]
      		this.tasa_anual_mejora = tasa_anual;
          this.tasa_anual_liquidez = tasa_anual_liquidez === undefined ? 0 : tasa_anual_liquidez;
      		this.comision_apertura_porcentaje = comision_apertura_porcentaje;
      		this.comision_admin = comision_admin;
      		this.avaluo = avaluo
          this.enganche = this.valor - this.monto;
      		this.aforo = this.monto/this.valor * 100;
      		this.plazo_meses = this.plazo*12;
      		//TODO tasa_anual, gastos_notariales_porcentaje, plazo_meses, monto_credito
      		this.pago_fijo_mensual_liquidez = 10000;
          this.seguro_vida_liquidez
          this.pago_mensual_liquidez
          this.pago_fijo_mensual_mejora

      		this.comision_apertura_cantidad = (this.comision_apertura_porcentaje/10)*this.monto
      		this.gastos_notariales = this.monto*0.06;
          this.gastos_originacion = this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
          this.desembolso_inicial = this.enganche + this.gastos_originacion;
      		this.seguro_vida_mensual = this.monto * (0.27/1000);
      		this.seguro_danios_mensual = (this.monto*0.8)*(0.34916/1000);
      		this.pago_mensual_total + this.seguro_vida_mensual + this.pago_fijo_mensual + this.comision_admin;
      		this.comision_apertura_cantidad + this.gastos_notariales + this.avaluo;
          this.ingreso_mensual_requerido = this.pago_fijo_mensual/0.3
      	}


  var objTasas = {
  	'tasaA' : {
  		'tasa_anual': 11.30,
      'tasa_anual_liquidez': 12.30,
  		'comision_apertura_porcentaje': 1,
  		'comision_admin': 374,
  		'avaluo': 1500,
  	},
  	'tasaB' : {
  		'tasa_anual': 12.30,
      'tasa_anual_liquidez': 12.50,
  		'comision_apertura_porcentaje': 1.50,
  		'comision_admin': 374,
  		'avaluo': 1500,
  	},
  	'tasaC' : {
  		'tasa_anual': 13,
      'tasa_anual_liquidez': 13.50,
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

  const infonavitForm = `
  <div class="row">

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
    <form action="#" method="post" id="infonavitCredits">
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col info-cofi hidden">
			<label for="valorInmueble">Valor del inmueble</label>
			<input type="tel" class="form-control validate input-infonavit" id="valorInmueble" placeholder="">
			<span class="input-success"></span>
			<span class="input-error"></span>
		</div>
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col infonavit hidden">
      <label for="monto-credito">Monto de Crédito</label>
      <input type="tel" class="form-control validate input-infonavit" id="monto-credito" name="monto_credito" placeholder="">
      <span class="input-success"></span>
      <span class="input-error"></span>
    </div>
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col cofinavit hidden">
			<label for="montoCredito">Monto del Crédito Infonavit</label>
			<input type="tel" class="form-control validate input-infonavit" id="montoCredito" placeholder="">
			<span class="input-success"></span>
			<span class="input-error"></span>
		</div>
	</div>

	<div class="row">
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col cofinavit hidden">
			<label for="saldo_subcuenta">Saldo en subcuenta de vivienda</label>
			<input type="tel" class="form-control validate input-infonavit" id="saldo_subcuenta" placeholder="">
			<span class="input-success"></span>
			<span class="input-error"></span>
		</div>
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col cofinavit hidden">
			<label for="pago_fijo_infonavit">Pago fijo mensual Infonavit</label>
			<input type="tel" class="form-control validate input-infonavit" id="pago_fijo_infonavit" placeholder="">
			<span class="input-success"></span>
			<span class="input-error"></span>
		</div>
		<div class="form-group col-xs-12 col-md-4 padding-dekstop-col cofinavit hidden">
			<label for="gastos_infonavit">Gastos Infonavit</label>
			<input type="tel" class="form-control validate input-infonavit" id="gastos_infonavit" placeholder="">
			<span class="input-success"></span>
			<span class="input-error"></span>
		</div>
	</div>

	<div class="row">
		<div class="form-group col-xs-12 col-md-4 info-cofi hidden">
			<label for="valorInmueble">Plazo</label>
			<div class="input-group add-on col-xs-12">

				<div class="input-group-btn left">
					<button class="btn btn-default btn-number" data-type="minus" data-field="quant[1]"><i class="glyphicon glyphicon-minus"></i></button>
				</div>
				<input id="plazo" name="quant[1]" value="10 años" min="1" max="25" type="text" class="form-control validate input-number" readonly>
				<div class="input-group-btn right">
					<button class="btn btn-default btn-number" data-type="plus" data-field="quant[1]"><i class="glyphicon glyphicon-plus"></i></button>
				</div>
			</div>
			<span id="yearsSuccess" class="input-success"></span>
			<span id="yearsError" class="input-error"></span>
		</div>
	</div>
</form>
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
      <label for="">Plazo</label>
      <div class="input-group add-on col-xs-12">

        <div class="input-group-btn left">
          <button class="btn btn-default btn-number" data-type="minus" data-field="plazo"><i class="glyphicon glyphicon-minus"></i></button>
        </div>
        <input name="plazo" value="10 años" min="1" max="25" type="text" class="form-control validate input-number" readonly>
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
  <form action="#" method="post" id="formMejora">
  <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
    <label for="valor">Valor del inmueble</label>
    <input type="tel" class="form-control validate" name="valor" id="valor" placeholder="">
    <span class="input-success"></span>
    <span class="input-error"></span>
  </div>

  <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
    <label for="saldo_restante">Saldo restante del Crédito</label>
    <input type="tel" class="form-control validate" name="saldo_restante" id="saldo_restante" placeholder="">
    <span class="input-success"></span>
    <span class="input-error"></span>
  </div>
  <div class="form-group col-xs-12 col-md-4 padding-dekstop-col">
    <label for="monto_solicitado">Monto solicitado Liquidez</label>
    <input type="tel" class="form-control validate" name="monto_solicitado" id="monto_solicitado" placeholder="">
    <span class="input-success"></span>
    <span class="input-error"></span>
  </div>
  <div class="form-group col-xs-12 col-md-4">
    <label for="valorInmueble">Plazo</label>
    <div class="input-group add-on col-xs-12">

      <div class="input-group-btn left">
        <button class="btn btn-default btn-number" data-type="minus" data-field="plazo"><i class="glyphicon glyphicon-minus"></i></button>
      </div>
      <input id="plazo" name="plazo" value="10 años" min="1" max="25" type="text" class="form-control validate input-number" readonly>
      <div class="input-group-btn right">
        <button class="btn btn-default btn-number" data-type="plus" data-field="plazo"><i class="glyphicon glyphicon-plus"></i></button>
      </div>
    </div>
    <span id="yearsSuccess" class="input-success"></span>
    <span id="yearsError" class="input-error"></span>
  </div>
</form>
  `

  const propuestasAMLAI = function(a, b, c) {
    return `
    <div class="col-md-12">
      <h1 class="title-section">Tus Opciones de Crédito</h1>
      <div id="credit-proposals swiper-container">
        <div class="credit-proposals-wrapper swiper-wrapper">

          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-red">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA A</span>
              </div>
              <div class="panel-body">
                <p class="list-title">Valor del Inmueble</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.valor)}</span>
                <p class="list-title">Monto del Crédito</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.monto)}</span>
                <p class="list-title">Aforo</p>
                <span class="list-item">${a.aforo}%</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${a.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${a.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${a.tasa_anual} %</span>
                <p class="list-title">Pago Fijo Mensual</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.pago_fijo_mensual)}</span>
                <p class="list-title">Desembolso Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${a.comision_apertura_porcentaje} % %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.comision_apertura_cantidad)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_notariales)}</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_originacion)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.comision_admin)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.desembolso_inicial)}</span>
                <div class="divider"></div>

                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_danios_mensual)}</span>
                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.ingreso_mensual_requerido)}</span>
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
                <span class="list-item">$ ${formatCurrencyOfNumber(b.valor)}</span>
                <p class="list-title">Monto del Crédito</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.monto)}</span>
                <p class="list-title">Aforo</p>
                <span class="list-item">${b.aforo}%</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${b.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${b.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${b.tasa_anual} %</span>
                <p class="list-title">Pago Fijo Mensual</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.pago_fijo_mensual)}</span>
                <p class="list-title">Desembolso Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${b.comision_apertura_porcentaje} %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.comision_apertura_cantidad)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_notariales)}</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_originacion)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.comision_admin)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.desembolso_inicial)}</span>
                <div class="divider"></div>

                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_danios_mensual)}</span>
                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.ingreso_mensual_requerido)}</span>
                <div class="divider"></div>
                <p>CAT promedio</p>
                <div class="center">
                  <a href="solicitud.html" class="btn btn-form">Solicitar</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-dark">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA C</span>
              </div>
              <div class="panel-body">
                <p class="list-title">Valor del Inmueble</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.valor)}</span>
                <p class="list-title">Monto del Crédito</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.monto)}</span>
                <p class="list-title">Aforo</p>
                <span class="list-item">${c.aforo}%</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${c.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${c.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${c.tasa_anual} %</span>
                <p class="list-title">Pago Fijo Mensual</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.pago_fijo_mensual)}</span>
                <p class="list-title">Desembolso Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${c.comision_apertura_porcentaje} %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.comision_apertura_cantidad)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_notariales)}</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_originacion)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.comision_admin)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.desembolso_inicial)}</span>
                <div class="divider"></div>

                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_danios_mensual)}</span>
                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.ingreso_mensual_requerido)}</span>
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

  const propuestasCofinavit = function(a, b, c) {
    return `
    <div class="col-md-12">
      <h1 class="title-section">Tus Opciones de Crédito</h1>
      <div id="credit-proposals swiper-container">
        <div class="credit-proposals-wrapper swiper-wrapper">

          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-red">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA A</span>
              </div>
              <div class="panel-body">
                <p class="list-title">Valor del Inmueble</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.valor)}</span>
                <p class="list-title">Monto del Crédito Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.monto)}</span>
                <p class="list-title">Saldo en subcuenta de vivienda</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.saldo_subcuenta)}</span>
                <p class="list-title">Pago fijo mensual Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.pago_fijo_infonavit)}</span>
                <p class="list-title">Gastos Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_infonavit)}</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${a.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${a.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${a.tasa_anual} %</span>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${a.comision_apertura_porcentaje} %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.comision_apertura_cantidad)}</span>
                <p class="list-title">Monto total Infonavit</p>
                <span class="list-item">${a.monto_infonavit}%</span>
                <p class="list-title">Monto de Crédito bx+</p>
                <span class="list-item">${a.monto_bx}%</span>
                <p class="list-title">Aforo Banco</p>
                <span class="list-item">${a.aforo}%</span>
                <p class="list-title">Aforo Banco + Infonavit</p>
                <span class="list-item">${a.aforo}%</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_originacion)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_notariales)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.desembolso_inicial)}</span>
                <p class="list-title">Pago Fijo Mensual bx+</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.pago_fijo_mensual)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.comision_admin)}</span>
                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_danios_mensual)}</span>
                <p class="list-title">Pago mensual Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>

                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(a.ingreso_mensual_requerido)}</span>
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
                <span class="list-item">$ ${formatCurrencyOfNumber(b.valor)}</span>
                <p class="list-title">Monto del Crédito Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.monto)}</span>
                <p class="list-title">Saldo en subcuenta de vivienda</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.saldo_subcuenta)}</span>
                <p class="list-title">Pago fijo mensual Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.pago_fijo_infonavit)}</span>
                <p class="list-title">Gastos Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_infonavit)}</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${b.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${b.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${b.tasa_anual} %</span>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${b.comision_apertura_porcentaje} %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.comision_apertura_cantidad)}</span>
                <p class="list-title">Monto total Infonavit</p>
                <span class="list-item">${b.monto_infonavit}%</span>
                <p class="list-title">Monto de Crédito bx+</p>
                <span class="list-item">${b.monto_bx}%</span>
                <p class="list-title">Aforo Banco</p>
                <span class="list-item">${b.aforo}%</span>
                <p class="list-title">Aforo Banco + Infonavit</p>
                <span class="list-item">${b.aforo}%</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_originacion)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_notariales)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.desembolso_inicial)}</span>
                <p class="list-title">Pago Fijo Mensual bx+</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.pago_fijo_mensual)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.comision_admin)}</span>
                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_danios_mensual)}</span>
                <p class="list-title">Pago mensual Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>

                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(b.ingreso_mensual_requerido)}</span>
                <div class="divider"></div>
                <p>CAT promedio</p>
                <div class="center">
                  <a href="solicitud.html" class="btn btn-form">Solicitar</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-dark">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA C</span>
              </div>
              <div class="panel-body">
                <p class="list-title">Valor del Inmueble</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.valor)}</span>
                <p class="list-title">Monto del Crédito Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.monto)}</span>
                <p class="list-title">Saldo en subcuenta de vivienda</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.saldo_subcuenta)}</span>
                <p class="list-title">Pago fijo mensual Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.pago_fijo_infonavit)}</span>
                <p class="list-title">Gastos Infonavit</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_infonavit)}</span>
                <p class="list-title">Plazo en Años</p>
                <span class="list-item">${c.plazo}</span>
                <p class="list-title">Plazo en meses</p>
                <span class="list-item">${c.plazo_meses}</span>
                <p class="list-title">Tasa Anual</p>
                <span class="list-item">${c.tasa_anual} %</span>
                <p class="list-title">Comisión Apertura</p>
                <span class="list-item-percentage">${c.comision_apertura_porcentaje} %</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.comision_apertura_cantidad)}</span>
                <p class="list-title">Monto total Infonavit</p>
                <span class="list-item">${c.monto_infonavit}%</span>
                <p class="list-title">Monto de Crédito bx+</p>
                <span class="list-item">${c.monto_bx}%</span>
                <p class="list-title">Aforo Banco</p>
                <span class="list-item">${c.aforo}%</span>
                <p class="list-title">Aforo Banco + Infonavit</p>
                <span class="list-item">${c.aforo}%</span>
                <p class="list-title">Gastos de Originación</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_originacion)}</span>
                <p class="list-title">Gastos Notariales</p>
                <span class="list-item-percentage">6%</span>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_notariales)}</span>
                <p class="list-title">Avalúo</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.avaluo)}</span>
                <p class="list-title">Enganche</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.enganche)}</span>
                <p class="list-title">Desembolso inicial</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.desembolso_inicial)}</span>
                <p class="list-title">Pago Fijo Mensual bx+</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.pago_fijo_mensual)}</span>
                <p class="list-title">Comisión admin</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.comision_admin)}</span>
                <p class="list-title">Seguro de vida</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_vida_mensual)}</span>
                <p class="list-title">Seguro daños (mensual)</p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_danios_mensual)}</span>
                <p class="list-title">Pago mensual Total</p>
                <span class="list-item">$250,000</span>
                <div class="divider"></div>

                <p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
                <span class="list-item">$ ${formatCurrencyOfNumber(c.ingreso_mensual_requerido)}</span>
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

  const propuestasMejoraLiquidez = function(a, b, c) {
    return `
    <div class="col-md-12">
      <h1 class="title-section">Tus Opciones de Crédito</h1>
      <div id="credit-proposals swiper-container">
        <div class="credit-proposals-wrapper swiper-wrapper">

          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-red">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA A</span>
              </div>
              <div class="panel-body">
            		<p class="list-title">Valor del Inmueble</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.valor)}</span>
            		<p class="list-title">Saldo Restante del Crédito</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.saldo_restante)}</span>
            		<p class="list-title">Aforo</p>
            		<span class="list-item">${a.aforo} %</span>
            		<p class="list-title">Aforo Máximo</p>
            		<span class="list-item">${a.aforo_maximo} %</span>
            		<p class="list-title">Monto Máximo Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.monto_maximo)}</span>
            		<p class="list-title">Monto Solicitado Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.monto_solicitado)}</span>
            		<p class="list-title">Aforo Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.aforo_total)}</span>
            		<p class="list-title">Plazo en Años</p>
            		<span class="list-item">${a.plazo}</span>
            		<p class="list-title">Plazo en meses</p>
            		<span class="list-item">${a.plazo_meses}</span>
            		<p class="list-title">Tasa Anual Mejora</p>
            		<span class="list-item">${a.tasa_anual} %</span>
            		<p class="list-title">Tasa Anual Liquidez</p>
            		<span class="list-item">${a.tasa_anual_liquidez} %</span>
            		<p class="list-title">Comisión Apertura</p>
            		<span class="list-item-percentage">${a.comision_apertura_porcentaje} %</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.comision_apertura_cantidad)}</span>
            		<p class="list-title">Gastos de Originación</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_originacion)}</span>
            		<p class="list-title">Gastos Notariales</p>
            		<span class="list-item-percentage">6%</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.gastos_notariales)}</span>
            		<p class="list-title">Avalúo</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.avaluo)}</span>
            		<p class="list-title">Pago Fijo Mensual Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.pago_mensual_liquidez)}</span>
            		<p class="list-title">Seguro de Vida Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_vida_liquidez)}</span>
            		<p class="list-title">Pago Mensual Total Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.pago_mensual_liquidez)}</span>
            		<p class="list-title">Pago Fijo Mensual Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.pago_fijo_mensual_mejora)}</span>
            		<p class="list-title">Comisión admin</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.comision_admin)}</span>
            		<p class="list-title">Seguro de vida Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_vida_mensual)}</span>
            		<p class="list-title">Seguro daños Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.seguro_danios_mensual)}</span>
            		<p class="list-title">Pago mensual Total Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.pago_mensual_total_mejora)}</span>
            		<p class="list-title">Pago mensual Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.pago_mensual_total)}</span>
            		<div class="divider"></div>

            		<p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(a.ingreso_mensual_requerido)}</span>
            		<div class="divider"></div>
            		<p>CAT promedio sin IVA</p>
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
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.valor)}</span>
            		<p class="list-title">Saldo Restante del Crédito</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.saldo_restante)}</span>
            		<p class="list-title">Aforo</p>
            		<span class="list-item">${b.aforo}%</span>
            		<p class="list-title">Aforo Máximo</p>
            		<span class="list-item">${b.aforo_maximo}%</span>
            		<p class="list-title">Monto Máximo Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.monto_maximo)}</span>
            		<p class="list-title">Monto Solicitado Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.monto_solicitado)}</span>
            		<p class="list-title">Aforo Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.aforo_total)}</span>
            		<p class="list-title">Plazo en Años</p>
            		<span class="list-item">${b.plazo}</span>
            		<p class="list-title">Plazo en meses</p>
            		<span class="list-item">${b.plazo_meses}</span>
            		<p class="list-title">Tasa Anual Mejora</p>
            		<span class="list-item">${b.tasa_anual} %</span>
            		<p class="list-title">Tasa Anual Liquidez</p>
            		<span class="list-item">${b.tasa_anual_liquidez} %</span>
            		<p class="list-title">Comisión Apertura</p>
            		<span class="list-item-percentage">${b.comision_apertura_porcentaje} %</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.comision_apertura_cantidad)}</span>
            		<p class="list-title">Gastos de Originación</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_originacion)}</span>
            		<p class="list-title">Gastos Notariales</p>
            		<span class="list-item-percentage">6%</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.gastos_notariales)}</span>
            		<p class="list-title">Avalúo</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.avaluo)}</span>
            		<p class="list-title">Pago Fijo Mensual Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.pago_mensual_liquidez)}</span>
            		<p class="list-title">Seguro de Vida Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_vida_liquidez)}</span>
            		<p class="list-title">Pago Mensual Total Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.pago_mensual_liquidez)}</span>
            		<p class="list-title">Pago Fijo Mensual Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.pago_fijo_mensual_mejora)}</span>
            		<p class="list-title">Comisión admin</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.comision_admin)}</span>
            		<p class="list-title">Seguro de vida Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_vida_mensual)}</span>
            		<p class="list-title">Seguro daños Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.seguro_danios_mensual)}</span>
            		<p class="list-title">Pago mensual Total Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.pago_mensual_total_mejora)}</span>
            		<p class="list-title">Pago mensual Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.pago_mensual_total)}</span>
            		<div class="divider"></div>

            		<p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(b.ingreso_mensual_requerido)}</span>
            		<div class="divider"></div>
            		<p>CAT promedio sin IVA</p>
            		<div class="center">
            			<a href="solicitud.html" class="btn btn-form">Solicitar</a>
            		</div>
            	</div>
            </div>
          </div>
          <div class="col-xs-12 col-md-4 credit-promo swiper-slide">
            <div class="panel panel-default panel-dark">
              <div class="panel-header">
                <img src="img/icons/house-white.png" alt="">
                <span>TASA C</span>
              </div>
              <div class="panel-body">
            		<p class="list-title">Valor del Inmueble</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.valor)}</span>
            		<p class="list-title">Saldo Restante del Crédito</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.saldo_restante)}</span>
            		<p class="list-title">Aforo</p>
            		<span class="list-item">${c.aforo}%</span>
            		<p class="list-title">Aforo Máximo</p>
            		<span class="list-item">${c.aforo_maximo}%</span>
            		<p class="list-title">Monto Máximo Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.monto_maximo)}</span>
            		<p class="list-title">Monto Solicitado Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.monto_solicitado)}</span>
            		<p class="list-title">Aforo Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.aforo_total)}</span>
            		<p class="list-title">Plazo en Años</p>
            		<span class="list-item">${c.plazo}</span>
            		<p class="list-title">Plazo en meses</p>
            		<span class="list-item">${c.plazo_meses}</span>
            		<p class="list-title">Tasa Anual Mejora</p>
            		<span class="list-item">${c.tasa_anual} %</span>
            		<p class="list-title">Tasa Anual Liquidez</p>
            		<span class="list-item">${c.tasa_anual_liquidez} %</span>
            		<p class="list-title">Comisión Apertura</p>
            		<span class="list-item-percentage">${c.comision_apertura_porcentaje} %</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.comision_apertura_cantidad)}</span>
            		<p class="list-title">Gastos de Originación</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_originacion)}</span>
            		<p class="list-title">Gastos Notariales</p>
            		<span class="list-item-percentage">6%</span>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.gastos_notariales)}</span>
            		<p class="list-title">Avalúo</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.avaluo)}</span>
            		<p class="list-title">Pago Fijo Mensual Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.pago_mensual_liquidez)}</span>
            		<p class="list-title">Seguro de Vida Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_vida_liquidez)}</span>
            		<p class="list-title">Pago Mensual Total Liquidez</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.pago_mensual_liquidez)}</span>
            		<p class="list-title">Pago Fijo Mensual Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.pago_fijo_mensual_mejora)}</span>
            		<p class="list-title">Comisión admin</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.comision_admin)}</span>
            		<p class="list-title">Seguro de vida Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_vida_mensual)}</span>
            		<p class="list-title">Seguro daños Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.seguro_danios_mensual)}</span>
            		<p class="list-title">Pago mensual Total Mejora</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.pago_mensual_total_mejora)}</span>
            		<p class="list-title">Pago mensual Total</p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.pago_mensual_total)}</span>
            		<div class="divider"></div>

            		<p class="list-title">Ingreso mensual requerido <i class="fa fa-info"></i></p>
            		<span class="list-item">$ ${formatCurrencyOfNumber(c.ingreso_mensual_requerido)}</span>
            		<div class="divider"></div>
            		<p>CAT promedio sin IVA</p>
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
