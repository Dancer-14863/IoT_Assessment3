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
            <b-numberinput min="0" max="15"> </b-numberinput>
          </b-field>
          <b-button type="is-success" class="mt-4"
            >Update Configuration</b-button
          >
        </div>
        <div class="mt-5">
          <h1 class="is-size-4">Manual Control</h1>
          <b-button type="is-success" class="mt-4" outlined
            >Turn Water Pump On</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Node3Card from './Node3Card.vue'

export default Vue.extend({
  name: 'Node3Section',
  components: { Node3Card },
})
</script>