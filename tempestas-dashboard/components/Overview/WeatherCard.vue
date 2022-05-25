<template>
  <div class="card has-background-primary-light p-3">
    <div class="card-content">
      <div class="columns is-flex is-vcentered">
        <div class="column is-3">
          <b-icon icon="cloud-outline" size="is-large" type="is-primary">
          </b-icon>
        </div>
        <div class="column">
          <p class="is-size-6 has-text-primary">Kuching</p>
          <p class="is-size-3 has-text-primary has-text-weight-bold">
            32.0 &#8451;
          </p>
          <p class="is-size-5 has-text-primary">Sunny</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'WeatherCard',
})
</script>
