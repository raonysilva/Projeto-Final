let chart;

export function showChart() {
  const data = {
    labels: [],
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [],
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  chart = new Chart(document.getElementById('myChart'), config);
}

export function updateChart(values) {
  chart.data.labels = Array.from(values.keys());
  chart.data.datasets[0].data = values;
  chart.update();
}