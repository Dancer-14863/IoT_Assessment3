<template>
  <div class="columns">
	  <div class="column is-3">
		  <WeatherCard />
	  </div>
	  <div class="column is-3">
		  <WaterCard />
	  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Overview',
})
</script>