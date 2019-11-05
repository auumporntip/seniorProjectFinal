<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

export default {
  extends: Line,
  props: ['height', 'width'],
  mounted () {
    const brandInfo = getStyle('--light-blue') || '#63c2de'
    const datasets2 = [
      {
        label: 'My First dataset',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data: [1, 18, 9, 17, 34, 22, 11]
      }
    ]

    this.renderChart(
      {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: datasets2
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
          xAxes: [
            {
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                display: false,
                min: Math.min.apply(Math, datasets2[0].data) - 5,
                max: Math.max.apply(Math, datasets2[0].data) + 5
              }
            }
          ]
        },
        elements: {
          line: {
            tension: 0.00001,
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
  /* IE fix */
  /* #card-chart1, #card-chart-02 {
    width: 197px;
  } */
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
