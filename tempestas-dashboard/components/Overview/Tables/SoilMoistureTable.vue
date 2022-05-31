<template>
  <div class="card p-3">
    <div class="card-content">
      <p class="is-size-4">Soil Moisture Data</p>
      <b-table
        :data="soilMoistureLogs"
        paginated
        per-page="5"
        default-sort="id"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column
          field="id"
          label="ID"
          width="40"
          sortable
          numeric
          v-slot="props"
        >
          {{ props.row.id }}
        </b-table-column>

        <b-table-column
          field="sensor_reading"
          label="Soil Moisture Level"
          v-slot="props"
          sortable
          centered
        >
          {{ props.row.sensor_reading }} %
        </b-table-column>

        <b-table-column
          field="status"
          label="Status"
          sortable
          centered
          v-slot="props"
        >
          <span class="tag" :class="[
			  props.row.status === 'NORMAL' ? 'is-success' : 'is-danger'
		  ]">
            {{ props.row.status }}
          </span>
        </b-table-column>

        <b-table-column
          field="recorded_at"
          label="Date Time"
          v-slot="props"
          sortable
        >
          <span class="tag">
            {{ new Date(props.row.recorded_at) | toDateTimeString }}
          </span>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Node1SensorLogDTO } from '~/dto/node1_sensor_log_dto'
import { toDateTimeString } from '~/utils/filters/date_time_string'
export default Vue.extend({
  name: 'SoilMoistureTable',
  filters: { toDateTimeString },
  computed: {
    soilMoistureLogs(): Node1SensorLogDTO[] {
      return this.$store.state.node1.soilMoistureLogs
    },
  },
})
</script>