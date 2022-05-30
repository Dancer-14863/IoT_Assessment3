<template>
  <div class="columns">
    <div class="column is-3">
      <WeatherCard />
    </div>
    <div class="column is-3">
      <SoilMoistureCard />
    </div>
    <div class="column is-3">
      <WaterCard />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherCard from './WeatherCard.vue'
import WaterCard from './WaterCard.vue'
import SoilMoistureCard from './SoilMoistureCard.vue'
export default Vue.extend({
  components: { WeatherCard, WaterCard, SoilMoistureCard },
  name: 'Overview',
})
</script>