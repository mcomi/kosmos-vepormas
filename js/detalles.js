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
  $('#escolaridad').editable()
});


var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
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



var donutEl = document.getElementById("donut").getContext("2d");
var donut = new Chart(donutEl, {
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



var popCanvas = document.getElementById("bubble");

var popData = {
  datasets: [{
    label: ['Ingresos'],
    data: [{
      x: 100,
      y: 0,
      r: 10
    }, {
      x: 60,
      y: 30,
      r: 8
    }, {
      x: 40,
      y: 60,
      r: 15
    }, {
      x: 80,
      y: 80,
      r: 10
    }, {
      x: 20,
      y: 30,
      r: 5
    }, {
      x: 0,
      y: 100,
      r: 5
    },{
      x: 30,
      y: 50,
      r: 5
    },
    {
      x: 20,
      y: 70,
      r: 6
    },
    {
      x: 60,
      y: 80,
      r: 15
    }],
    backgroundColor: "#2C82BE",
    hoverBackgroundColor: "#000000",
    hoverBorderColor: "#2C82BE",
    hoverBorderWidth: 5,
    hoverRadius: 5
  }]
};

var bubbleChart = new Chart(popCanvas, {
  type: 'bubble',
  data: popData
});
