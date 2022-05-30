<template>
  <div>
    <div class="py-2 columns is-variable is-5">
      <div class="column is-6">
        <h1 class="is-size-4">God Mode</h1>
        <b-field label="Weather" class="mt-4">
          <section>
            <div class="block">
              <b-radio v-model="weatherCode" name="name" native-value="800">
                Clear
              </b-radio>
              <b-radio v-model="weatherCode" name="name" native-value="500">
                Light Rain
              </b-radio>
              <b-radio v-model="weatherCode" name="name" native-value="200">
                Heavy Rain
              </b-radio>
            </div>
          </section>
        </b-field>
        <b-button
          type="is-success"
          class="mt-4"
          outlined
          @click="sendDebugCommand"
          >Change Weather</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DebugSection',
  data() {
    return {
      weatherCode: 800,
    }
  },
  methods: {
    sendDebugCommand() {
      this.$store.dispatch('main/sendDebugCommand', this.weatherCode)
    },
  },
})
</script>