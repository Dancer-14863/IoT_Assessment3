<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="is-flex is-justify-content-space-between">
            <p class="title is-4">Soil Moisture Node</p>
            <b-button type="is-primary" outlined @click="fetchNode1Status"
              >Fetch Status</b-button
            >
          </div>
        </div>
      </div>
      <div class="content">
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Device ID</p>
          <p>{{ node1Status.device_id }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Online Since</p>
          <p>{{ node1Status.up_date_time }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Last Recorded Status</p>
          <p>{{ node1Status.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NodeStatusDTO } from '~/dto/node_status_dto'
export default Vue.extend({
  name: 'Node1Card',
  computed: {
    node1Status(): NodeStatusDTO {
      return this.$store.state.mqtt.node1Status
    },
  },

  methods: {
    fetchNode1Status() {
      this.$store.dispatch('mqtt/getNode1Status')
    },
  },
})
</script>