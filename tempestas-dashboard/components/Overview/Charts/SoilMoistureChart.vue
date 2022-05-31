<template>
  <div class="card p-3">
    <div class="card-content">
      <p class="is-size-4">Realtime Soil Moisture Readings</p>
      <apex-chart
        width="100%"
        height="400"
        type="line"
        :options="chartOptions"
        :series="chartSeries"
      ></apex-chart>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Node1SensorLogDTO } from '~/dto/node1_sensor_log_dto'
export default Vue.extend({
  name: 'SoilMoistureChart',
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'soil-moisture-chart',
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 36000,
          labels: {
            datetimeUTC: false,
          },
          title: { text: 'Time' },
        },
        yaxis: {
          max: 100,
          min: 0,
          title: { text: 'Soil Moisture %' },
        },
        tooltip: {
          enabled: false,
        },
        colors: ['#7957D5'],
      },
      chartSeries: [
        {
          data: [] as Array<Array<any>>,
        },
      ],
    }
  },
  mounted() {
    this.$store.commit(
      'main/setSoilMoistureCallback',
      (data: Node1SensorLogDTO) => {
        const chartSeriesData: Array<Array<any>> =
          this.chartSeries[0].data.slice()
        if (chartSeriesData.length > 10) {
          chartSeriesData.shift()
        }
        chartSeriesData.push([
          new Date(`${data.recorded_at} UTC`).getTime(),
          data.sensor_reading,
        ])
        this.chartSeries = [
          {
            data: chartSeriesData,
          },
        ]
      }
    )
  },
})
</script>