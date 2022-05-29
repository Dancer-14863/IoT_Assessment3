<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node1Card />
      </div>
      <div class="column is-6">
        <h1 class="is-size-4">Configuration</h1>
        <b-field label="Minimum Threshold for Soil Moisture" class="mt-4">
          <b-numberinput
            min="0"
            max="100"
            v-model="node1Configuration.min_threshold"
          >
          </b-numberinput>
        </b-field>
        <b-field label="Maximum Threshold for Soil Moisture">
          <b-numberinput
            min="0"
            max="100"
            v-model="node1Configuration.max_threshold"
          >
          </b-numberinput>
        </b-field>
        <b-button type="is-success" class="mt-4" @click="updateNode1Configuration">Update Configuration</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Node1ConfigurationDTO } from '~/dto/node1_configuration_dto'
import Node1Card from './Node1Card.vue'
export default Vue.extend({
  name: 'Node1Section',
  components: { Node1Card },
  data() {
    return {
      node1Configuration: {
        min_threshold: this.$store.state.mqtt.node1Configuration?.min_threshold ?? 25,
        max_threshold: this.$store.state.mqtt.node1Configuration?.max_threshold ?? 75,
      } as Node1ConfigurationDTO,
    }
  },
  methods: {
    updateNode1Configuration() {
      this.$store.dispatch(
        'mqtt/updateNode1Configuration',
        this.node1Configuration
      )
    },
  },
})
</script>