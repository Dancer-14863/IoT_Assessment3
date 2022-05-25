<template>
  <b-navbar class="is-dark py-1">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~assets/logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
		<p class="is-size-5 has-text-weight-bold ml-4">Tempestas Dashboard</p>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'Navbar'
})
</script>