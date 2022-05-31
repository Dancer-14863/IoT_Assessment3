import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './main'
import { Node1ConfigurationDTO } from '~/dto/node1_configuration_dto'
import { Node1SensorLogDTO } from '~/dto/node1_sensor_log_dto'

export const state = () => ({
  averageSoilMoisture: 0,
  soilMoistureLogs: [] as Node1SensorLogDTO[],
})

export type Node1ModuleState = ReturnType<typeof state>

export const getters: GetterTree<Node1ModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<Node1ModuleState> = {
  setAverageSoilMoisture: (state, averageSoilMoisture) => {
    state.averageSoilMoisture = averageSoilMoisture
  },
  setSoilMoistureLogs: (state, soilMoistureLogs) => {
    state.soilMoistureLogs = soilMoistureLogs
  },
}

export const actions: ActionTree<Node1ModuleState, MQTTModuleState> = {
  fetchConfiguration: async ({ commit }) => {
    try {
      const response = await $axios.get('node1/configuration')
      commit(
        'main/setNode1Configuration',
        response.data as Node1ConfigurationDTO,
        {
          root: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },

  fetchAllSensorLogs: async ({ commit }) => {
    try {
      const response = await $axios.get('node1/soil-moisture-logs')
      commit('setSoilMoistureLogs', response.data as Node1SensorLogDTO[])
    } catch (e) {
      console.log(e)
    }
  },

  fetchAverageSoilMoisture: async ({ commit }) => {
    try {
      const response = await $axios.get(
        'node1/soil-moisture-logs/average/today'
      )
      commit('setAverageSoilMoisture', response.data.average ?? 0)
    } catch (e) {
      console.log(e)
    }
  },
}
