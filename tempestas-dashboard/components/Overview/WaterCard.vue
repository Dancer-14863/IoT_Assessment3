<template>
  <div class="card has-background-primary-light p-3">
    <div class="card-content">
      <div class="columns is-flex is-vcentered">
        <div class="column is-3">
          <b-icon icon="water-outline" size="is-large" type="is-primary">
          </b-icon>
        </div>
        <div class="column">
          <p class="is-size-6 has-text-primary">Water Pumped</p>
          <p class="is-size-3 has-text-primary has-text-weight-bold">
            {{ totalWaterPumped }} L
          </p>
          <p class="is-size-5 has-text-primary">{{ dateToday }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import Vue from 'vue'
export default Vue.extend({
  name: 'WaterCard',
  computed: {
    totalWaterPumped(): number {
      return this.$store.state.node3.totalWaterPumped
    },
    dateToday(): string {
      return moment(new Date()).format('DD/MM/YYYY')
    },
  },
})
</script>