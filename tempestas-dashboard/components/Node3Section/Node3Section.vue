<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node3Card />
      </div>
      <div class="column is-6">
        <div>
          <h1 class="is-size-4">Configuration</h1>
          <b-field label="Litres to pump per minute" class="mt-4">
            <b-numberinput
              min="1"
              max="15"
              v-model="node3Configuration.litre_per_min"
            >
            </b-numberinput>
          </b-field>
          <b-button
            type="is-success"
            class="mt-4"
            @click="updateNode3Configuration"
            >Update Configuration</b-button
          >
        </div>
        <div class="mt-5">
          <h1 class="is-size-4">Manual Control</h1>
          <b-field label="Litres to pump" class="mt-4">
            <b-numberinput min="1" max="20" v-model="litresToPump">
            </b-numberinput>
          </b-field>
          <b-button
            type="is-success"
            class="mt-4"
            outlined
            @click="sendNode3WaterPumpCommand"
            >Turn Water Pump On</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Node3ConfigurationDTO } from '~/dto/node3_configuration_dto'
import Node3Card from './Node3Card.vue'

export default Vue.extend({
  name: 'Node3Section',
  components: { Node3Card },
  data() {
    return {
      litresToPump: 1,
      node3Configuration: {
        litre_per_min:
          this.$store.state.mqtt.node3Configuration?.litre_per_min ?? 1,
      } as Node3ConfigurationDTO,
    }
  },

  methods: {
    updateNode3Configuration() {
      this.$store.dispatch(
        'mqtt/updateNode3Configuration',
        this.node3Configuration
      )
    },

    sendNode3WaterPumpCommand() {
      this.$store.dispatch('mqtt/sendNode3WaterPumpCommand', this.litresToPump)
    },
  },
})
</script>