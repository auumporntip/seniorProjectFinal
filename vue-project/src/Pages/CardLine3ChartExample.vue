<script>
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

export default {
  extends: Line,
  props: ["height", "width"],
  
  mounted() {
    const brandPrimary = getStyle("--primary") || "#20a8d8";
    const datasets3 = [
      {
        label: "My First dataset",
        backgroundColor: "brandPrimary",
        borderColor: "rgba(255,255,255,.55)",
        data: [78, 81, 80, 45, 34, 12, 40]
      }
    ];
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: datasets3
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
                color: "transparent",
                zeroLineColor: "transparent"
              },
              ticks: {
                fontSize: 2,
                fontColor: "transparent"
              },
              display: false
            }
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                display: false,
                min: Math.min.apply(Math, datasets3[0].data) - 5,
                max: Math.max.apply(Math, datasets3[0].data) + 5
              }
            }
          ]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    );
  }
};
</script>
<style>
/* IE fix */
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