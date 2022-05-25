<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node1Card />
      </div>
      <div class="column is-6">
        <h1 class="is-size-4">Configuration</h1>
        <b-field label="Cover Mode" class="mt-4">
            <section>
                <div class="block">
                    <b-radio v-model="radio"
                        name="name"
                        native-value="Disabled">
                        Disabled
                    </b-radio>
                    <b-radio v-model="radio"
                        name="name"
                        native-value="Partial">
                        Partial
                    </b-radio>
                    <b-radio v-model="radio"
                        name="name"
                        native-value="Full">
                        Full
                    </b-radio>
                </div>
            </section>
        </b-field>
        <b-button type="is-success" class="mt-4">Update Configuration</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Node2Card from './Node2Card.vue'
export default Vue.extend({
  name: 'Node2Section',
  components: { Node2Card },
  data() {
    return {
         radio: 'Disabled'
        }
    }
})
</script>