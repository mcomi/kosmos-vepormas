var graficaEstadisticas = document.getElementById("grafica")
var graficaEstatus = document.getElementById('estatus')
var graficaProducto = document.getElementById('producto-chart')
var graficaPuntosVenta = document.getElementById('puntos_venta')
var graficaOrigen = document.getElementById('origen')

var graficaEstadisticasChart = new Chart(graficaEstadisticas, {
    type: 'bar',
    data: {

        datasets: [{
            data: [350000, 270000, 200000, 450000, 390000, 500000, 80000, 450000, 300000],
            backgroundColor: [
                '#2C82BE',
                '#76DDFB',
                '#2C82BE',
                '#76DDFB',
                '#2C82BE',
                '#76DDFB',
                '#2C82BE',
                '#76DDFB',
                '#2C82BE'
            ]
        }],
        labels: ['1', '2','3','4','5','6','7','8','9']
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

var chartEstatus = new Chart(graficaEstatus, {
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

var chartPuntosVenta = new Chart(graficaPuntosVenta, {
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



var chartOrigen = new Chart(graficaOrigen, {
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

var chartProducto = new Chart(graficaProducto, {
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
