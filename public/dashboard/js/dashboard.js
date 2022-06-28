(function($) {
  'use strict';
  $(function() {
    if ($("#performaneLine").length) {
      var graphGradient = document.getElementById("performaneLine").getContext('2d');
      var graphGradient2 = document.getElementById("performaneLine").getContext('2d');
      var saleGradientBg = graphGradient.createLinearGradient(232, 155, 122, 200);
      saleGradientBg.addColorStop(0, 'rgba(232, 155, 122, 0.25)');
      saleGradientBg.addColorStop(1, 'rgba(232, 155, 122, 0.05)');
      var saleGradientBg2 = graphGradient2.createLinearGradient(242, 202, 185, 300);
      saleGradientBg2.addColorStop(0, 'rgba(242, 202, 185, 0.3)');
      saleGradientBg2.addColorStop(1, 'rgba(242, 202, 185, 0.06)');
      var arraysByWeek = JSON.parse(window.sessionStorage.getItem("arraysByWeek"));
      var salesTopData = {
          labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
          datasets: [{
              label: 'This week',
              data: arraysByWeek.thisWeek,
              backgroundColor: saleGradientBg,
              borderColor: [
                  '#E89B7A',
              ],
              borderWidth: 1.5,
              fill: true, // 3: no fill
              pointBorderWidth: 1,
              pointRadius: [4, 4, 4, 4, 4, 4, 4],
              pointHoverRadius: [2, 2, 2, 2, 2, 2, 2],
              pointBackgroundColor: ['#E89B7A)', '#E89B7A', '#E89B7A', '#E89B7A','#E89B7A)', '#E89B7A', '#E89B7A'],
              pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
          },{
            label: 'Last week',
            data: arraysByWeek.lastWeek,
            backgroundColor: saleGradientBg2,
            borderColor: [
                '#F2CAB9',
            ],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 1,
            pointRadius:  [4, 4, 4, 4, 4, 4, 4],
            pointHoverRadius: [2, 2, 2, 2, 2, 2, 2],
            pointBackgroundColor: ['#F2CAB9)', '#F2CAB9', '#F2CAB9', '#F2CAB9','#F2CAB9)', '#F2CAB9', '#F2CAB9'],
              pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff'],
        }]
      };
  
      var salesTopOptions = {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  gridLines: {
                      display: true,
                      drawBorder: false,
                      color:"#F0F0F0",
                      zeroLineColor: '#F0F0F0',
                  },
                  ticks: {
                    beginAtZero: false,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    fontSize: 10,
                    color:"#6B778C"
                  }
              }],
              xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color:"#6B778C"
                }
            }],
          },
          legend:false,
          legendCallback: function (chart) {
            var text = [];
            text.push('<div class="chartjs-legend"><ul>');
            for (var i = 0; i < chart.data.datasets.length; i++) {
              console.log(chart.data.datasets[i]); // see what's inside the obj.
              text.push('<li>');
              text.push('<span style="background-color:' + chart.data.datasets[i].borderColor + '">' + '</span>');
              text.push(chart.data.datasets[i].label);
              text.push('</li>');
            }
            text.push('</ul></div>');
            return text.join("");
          },
          
          elements: {
              line: {
                  tension: 0.4,
              }
          },
          tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
          }
      }
      var salesTop = new Chart(graphGradient, {
          type: 'line',
          data: salesTopData,
          options: salesTopOptions
      });
      document.getElementById('performance-line-legend').innerHTML = salesTop.generateLegend();
    }

    var allRequisitions = window.sessionStorage.getItem("allRequisitions");
    var allProcessedRequisitions = window.sessionStorage.getItem("allProcessedRequisitions");

    if ($('#totalVisitors').length) {
      var bar = new ProgressBar.Circle(totalVisitors, {
        color: '#fff',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15, 
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#F2CAB9',
          width: 15
        },
        to: {
          color: '#E89B7A',
          width: 15
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '0rem';
      bar.animate(1); // Number from 0.0 to 1.0 MAKE A LEAP HERE
    }

    if ($('#visitperday').length) {
      var bar = new ProgressBar.Circle(visitperday, {
        color: '#fff',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 15,
        trailWidth: 15,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#F2CAB9',
          width: 15
        },
        to: {
          color: '#E89B7A',
          width: 15
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
  
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
  
        }
      });
  
      bar.text.style.fontSize = '0rem';
      bar.animate(allProcessedRequisitions/allRequisitions); // Number from 0.0 to 1.0 MAKE A LEAP HERE
    }

    if ($("#status-summary").length) {
      var statusSummaryChartCanvas = document.getElementById("status-summary").getContext('2d');;
      var statusData = {
          labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
          datasets: [{
              label: '# of Votes',
              data: arraysByWeek.lastWeek, //inserir dados aqui
              backgroundColor: "#F2CAB9",
              borderColor: [
                  '#E89B7A',
              ],
              borderWidth: 2,
              fill: false, // 3: no fill
              pointBorderWidth: 0,
              pointRadius: [0, 0, 0, 0, 0, 0, 0],
              pointHoverRadius: [0, 0, 0, 0, 0, 0, 0],
          }]
      };
  
      var statusOptions = {
        responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                display:false,
                  gridLines: {
                      display: false,
                      drawBorder: false,
                      color:"#F0F0F0"
                  },
                  ticks: {
                    beginAtZero: false,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    fontSize: 10,
                    color:"#6B778C"
                  }
              }],
              xAxes: [{
                display:false,
                gridLines: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color:"#6B778C"
                }
            }],
          },
          legend:false,
          
          elements: {
              line: {
                  tension: 0.4,
              }
          },
          tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
          }
      }
      var statusSummaryChart = new Chart(statusSummaryChartCanvas, {
          type: 'line',
          data: statusData,
          options: statusOptions
      });
    }

  });
})(jQuery);