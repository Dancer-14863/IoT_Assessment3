<template>
  <div class="card p-3">
    <div class="card-content">
      <p class="is-size-4">Litres of Water Pumped this Week</p>
      <apex-chart
        width="100%"
        height="400"
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
      ></apex-chart>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import Vue from 'vue'
import { Node3WaterPumpLogDTO } from '~/dto/node3_water_pump_log_dto'

export default Vue.extend({
  name: 'WaterPumpChart',
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'water-pump-chart',
          plotOptions: {
            bar: {
              borderRadius: 4,
            },
          },
        },
        xaxis: {
          title: { text: 'Week Day' },
          categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
		colors:['#7957D5'],
      },
      chartSeries: [
        {
          data: [0, 0, 0, 0, 0, 0, 0] as Array<number>,
        },
      ],
    }
  },
  beforeMount() {
    this.generateChartData()
  },

  methods: {
    generateChartData() {
      const waterPumpLogs: Node3WaterPumpLogDTO[] =
        this.$store.state.node3.waterPumpLogsOfWeek.slice()
      for (const waterPumpLog of waterPumpLogs) {
        const index =
          moment(new Date(`${waterPumpLog.recorded_at}`)).isoWeekday() - 1
        this.chartSeries[0].data[index] += waterPumpLog.pumped_litres
      }
    },
  },
})
</script>