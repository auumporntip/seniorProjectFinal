<script>
import { Bar } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Bar,
  props: ['height'],
  mounted () {
    const datasets4 = [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'rgba(255,255,255,.55)',
        data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
      }
    ]
    this.renderChart(
      {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: datasets4
      },
      {
        tooltips: {
          enabled: true,
          width: 700
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            
            display: false,
            categoryPercentage: 1,
            barPercentage: 0.5
          }],
          yAxes: [{
            display: false,
            ticks: {
                display: false,
                min: Math.min.apply(Math, datasets4[0].data) - 5,
                max: Math.max.apply(Math, datasets4[0].data) + 5
              }
          }]
        },
        elements: {
          line: {
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    )
  }
}
</script>
<style>
.tooltip-inner {
  max-width: 500px !important;
}
.chartjs-tooltip {
  position: absolute;
  z-index: 1021;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0.25rem 0.5rem;
  color: #fff;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.25s ease;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  border-radius: 0.25rem;
}
</style>