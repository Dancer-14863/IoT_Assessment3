<template>
  <div class="card p-3">
    <div class="card-content">
      <p class="is-size-4">Water Pump Data</p>
      <b-table
        :data="waterPumpLogs"
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
          field="pumped_litres"
          label="Pumped Litres"
          v-slot="props"
          sortable
          centered
        >
          {{ props.row.pumped_litres }} L
        </b-table-column>

        <b-table-column
          field="pumped_duration"
          label="Pump Duration"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.pumped_duration }} s
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
import { Node3WaterPumpLogDTO } from '~/dto/node3_water_pump_log_dto'
import { toDateTimeString } from '~/utils/filters/date_time_string'
export default Vue.extend({
  name: 'WaterPumpTable',
  filters: { toDateTimeString },
  computed: {
    waterPumpLogs(): Node3WaterPumpLogDTO[] {
      return this.$store.state.node3.waterPumpLogs
    },
  },
})
</script>