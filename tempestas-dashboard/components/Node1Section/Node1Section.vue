<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node1Card />
      </div>
      <div class="column is-6">
        <h1 class="is-size-4">Configuration</h1>
        <b-field label="Minimum Threshold for Soil Moisture" class="mt-4">
          <b-numberinput min="0" max="100"> </b-numberinput>
        </b-field>
        <b-field label="Maximum Threshold for Soil Moisture">
          <b-numberinput min="0" max="100"> </b-numberinput>
        </b-field>
        <b-button type="is-success" class="mt-4">Update Configuration</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Node1Card from './Node1Card.vue'
export default Vue.extend({
  name: 'Node1Section',
  components: { Node1Card },
})
</script>