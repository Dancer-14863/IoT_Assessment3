<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-4">
        <Node2Card />
      </div>
      <div class="column is-6">
        <h1 class="is-size-4">Manual Control</h1>
        <b-field label="Cover Mode" class="mt-4">
          <section>
            <div class="block">
              <b-radio v-model="coverMode" name="name" native-value="None">
                None
              </b-radio>
              <b-radio v-model="coverMode" name="name" native-value="Partial">
                Partial
              </b-radio>
              <b-radio v-model="coverMode" name="name" native-value="Full">
                Full
              </b-radio>
            </div>
          </section>
        </b-field>
        <b-button type="is-success" class="mt-4" outlined>Change Cover</b-button>
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
      coverMode: '',
    }
  },
})
</script>