<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="is-flex is-justify-content-space-between">
            <p class="title is-4">Water Pump Node</p>
            <b-button type="is-primary" outlined @click="fetchNode3Status">Fetch Status</b-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Device ID</p>
          <p>{{ node3Status.device_id }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Online Since</p>
          <p>{{ node3Status.up_date_time | toDateTimeString }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Last Recorded Status</p>
          <p>{{ node3Status.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NodeStatusDTO } from '~/dto/node_status_dto'
import { toDateTimeString } from '~/utils/filters/date_time_string'
export default Vue.extend({
  name: 'Node3Card',
  filters: { toDateTimeString },
  computed: {
    node3Status(): NodeStatusDTO {
      return this.$store.state.main.node3Status
    },
  },

  methods: {
    fetchNode3Status() {
      this.$store.dispatch('main/getNode3Status')
    },
  },
})
</script>