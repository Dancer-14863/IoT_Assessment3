<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node3Card />
      </div>
      <div class="column is-6">
        <h1 class="is-size-4">Configuration</h1>
        <b-field label="Water Pump Status" class="mt-4">
         <b-switch size="is-medium" :value="true"
            type="is-success">
            </b-switch>
        </b-field>
        <b-button type="is-success" class="mt-4">Update Configuration</b-button>
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