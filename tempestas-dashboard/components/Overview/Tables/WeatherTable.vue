<template>
  <div class="card p-3">
    <div class="card-content">
      <p class="is-size-4">Weather Data</p>
      <b-table
        :data="weatherDataList"
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
          field="weather_text"
          label="Weather"
          v-slot="props"
          centered
        >
          {{ props.row.weather_text }}
        </b-table-column>

        <b-table-column
          field="temperature"
          label="Temperature"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.temperature }}
        </b-table-column>

        <b-table-column
          field="rain_volume"
          label="Rain Volume"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.rain_volume }} mm
        </b-table-column>

        <b-table-column field="datetime" label="Date Time" v-slot="props" sortable>
          <span class="tag">
            {{ new Date(props.row.datetime) | toDateTimeString }}
          </span>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { WeatherDataDTO } from '~/dto/weather_data_dto'
import { toDateTimeString } from '~/utils/filters/date_time_string'
export default Vue.extend({
  name: 'WeatherTable',
  filters: { toDateTimeString },
  computed: {
    weatherDataList(): WeatherDataDTO[] {
      return this.$store.state.weather.weatherDataList
    },
  },
})
</script>