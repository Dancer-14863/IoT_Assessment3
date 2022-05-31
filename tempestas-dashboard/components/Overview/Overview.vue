<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <WeatherCard />
      </div>
      <div class="column is-4">
        <SoilMoistureCard />
      </div>
      <div class="column is-4">
        <WaterCard />
      </div>
    </div>
    <div class="columns mt-4">
      <div class="column is-6">
        <SoilMoistureChart />
      </div>
      <div class="column is-6">
        <WaterPumpChart />
      </div>
    </div>
    <div class="columns mt-4">
      <div class="column is-4">
        <WeatherTable />
      </div>
      <div class="column is-4">
        <SoilMoistureTable />
      </div>
      <div class="column is-4">
        <WaterPumpTable />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherCard from './WeatherCard.vue'
import WaterCard from './WaterCard.vue'
import SoilMoistureCard from './SoilMoistureCard.vue'
import SoilMoistureChart from './Charts/SoilMoistureChart.vue'
import WaterPumpChart from './Charts/WaterPumpChart.vue'
import WeatherTable from './Tables/WeatherTable.vue'
import SoilMoistureTable from './Tables/SoilMoistureTable.vue'
import WaterPumpTable from './Tables/WaterPumpTable.vue'
export default Vue.extend({
  components: {
    WeatherCard,
    WaterCard,
    SoilMoistureCard,
    SoilMoistureChart,
    WaterPumpChart,
    WeatherTable,
    SoilMoistureTable,
    WaterPumpTable
},
  name: 'Overview',
})
</script>