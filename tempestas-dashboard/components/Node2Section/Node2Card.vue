<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="is-flex is-justify-content-space-between">
            <p class="title is-4">Plant Cover Node</p>
            <b-button type="is-primary" outlined>Fetch Status</b-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Device ID</p>
          <p>0002</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Last Online</p>
          <p>25/05/2022</p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-bold">Last Recorded Status</p>
          <p>UP</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Node2Card',
})
</script>