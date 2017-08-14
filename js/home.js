var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
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

var ctx2 = document.getElementById('lineChart2').getContext('2d');
var myChart2 = new Chart(ctx2, {
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
