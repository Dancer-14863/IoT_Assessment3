<template>
  <main class="mx-6 my-4">
    <h1 class="is-size-3 has-text-weight-bold">Dashboard</h1>
    <b-tabs type="is-boxed" class="mt-4">
      <b-tab-item label="Overview">
        <Overview />
      </b-tab-item>
      <b-tab-item label="Node 1">
		    <Node1Section />
	    </b-tab-item>
      <b-tab-item label="Node 2">
        <Node2Section />
      </b-tab-item>
      <b-tab-item label="Node 3">
        <Node3Section />
      </b-tab-item>
    </b-tabs>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Dashboard',
})
</script>