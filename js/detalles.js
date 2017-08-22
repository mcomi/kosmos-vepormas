$(function() {

  $.fn.editable.defaults.mode = 'inline';
  $('#nombre').editable()
  $('#mail').editable()
  $('#fecha_nac').editable()
  $('#edad').editable()
  $('#escolaridad').editable()

  $('#edo_civil').editable({
    value: 2,
    source: [
      {
        value: 1,
        text: 'Soltero'
      }, {
        value: 2,
        text: 'Casado'
      }
    ]
  })

  $('#direccion').editable()
  $('#num_ext').editable()
  $('#num_int').editable()
  $('#colonia').editable()
  $('#cp').editable()
  $('#estado').editable()

  $('#nombre_a').editable()
  $('#tel_a').editable()
  $('#rel_a').editable()
  $('#nombre_c').editable()
  $('#tel_c').editable()
  $('#rel_c').editable()
  $('#nombre_b').editable()
  $('#tel_b').editable()
  $('#rel_b').editable()
  $('#tel_fijo').editable()
  $('#tel_cel').editable()

  $('#empresa').editable()
  $('#puesto').editable()
  $('#contrato').editable()
  $('#temporalidad').editable()
  $('#ingreso_neto').editable()
  $('#total_percepcion').editable()
  $('#percepcion').editable()
  $('#reduccion').editable()
  $('#neto').editable()
  $('#nss').editable()
});


var ingresoVsPagos = document.getElementById("ingresoVsPagos");
var myChart = new Chart(ingresoVsPagos, {
    type: 'bar',
    data: {

        datasets: [{
            data: [2400, 1400],
            backgroundColor: [
                '#2C82BE',
                '#76DDFB'
            ]

        }],
        labels: ['Ingresos', 'Pagos']
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


var saldos = document.getElementById("saldos").getContext("2d");
var chartSaldos = new Chart(saldos, {
  type: 'doughnut',
  data: {
      labels: ['data a', 'data b', 'data c'],
      datasets: [{

          data: [300, 50, 100],
          backgroundColor: [
              '#2C82BE',
              '#DBECF8',
              '#76DDFB'

          ]

      }]
  },
})

var mop = document.getElementById("mop").getContext("2d");
var chartMop = new Chart(mop, {
  type: 'doughnut',
  data: {
      labels: ['data a', 'data b', 'data c'],
      datasets: [{

          data: [300, 50, 100],
          backgroundColor: [
              '#2C82BE',
              '#DBECF8',
              '#76DDFB'

          ]

      }]
  },
})


var desglosePrestamosChart = document.getElementById("desglosePrestamosChart").getContext("2d");
var chartDesglosePrestamosChart = new Chart(desglosePrestamosChart, {
  type: 'doughnut',
  data: {
      labels: ['data a', 'data b', 'data c'],
      datasets: [{

          data: [300, 50, 100],
          backgroundColor: [
              '#2C82BE',
              '#DBECF8',
              '#76DDFB'

          ]

      }]
  },
})

var porcentajeMOB = document.getElementById("porcentajeMOB").getContext("2d");
var chartporcentajeMOB = new Chart(porcentajeMOB, {
  type: 'doughnut',
  data: {
      labels: ['data a', 'data b', 'data c'],
      datasets: [{

          data: [300, 50, 100],
          backgroundColor: [
              '#2C82BE',
              '#DBECF8',
              '#76DDFB'

          ]

      }]
  },
})




var ingresoVsPagosBuro = document.getElementById('ingresoVsPagosBuro').getContext('2d');
var ingresoVsPagosChart = new Chart(ingresoVsPagosBuro, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4'],
    datasets: [{
      data: [250000, 300000, 240000, 400000],
      backgroundColor: "rgba(255,255,255,0.6)"
    }, {
      data: [270000, 230000, 300000, 290000],
      backgroundColor: "rgba(255,245,246,0.6)"
    }]
  }
});

var historialSaldos = document.getElementById('historialSaldos').getContext('2d');
var historialSaldosChart = new Chart(historialSaldos, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4'],
    datasets: [{
      data: [250000, 300000, 240000, 400000],
      backgroundColor: "rgba(255,255,255,0.6)"
    }, {
      data: [270000, 230000, 300000, 290000],
      backgroundColor: "rgba(255,245,246,0.6)"
    }]
  }
});

var pdfPreview = document.getElementById('pdfPreview');

var docsLinks = document.querySelectorAll('.doc-link')

docsLinks.forEach(link => link.addEventListener('click', function(e){
  e.preventDefault()
  var options = {
   fallbackLink: "<p>Tu navegador no soporta ver el documento inline, puedes descargarlo <a href='[url]'>EN ESTE ENLACE</a></p>"
  };
  window.scrollTo(0,document.body.scrollHeight);
  PDFObject.embed(link.href, pdfPreview, options)
}))
