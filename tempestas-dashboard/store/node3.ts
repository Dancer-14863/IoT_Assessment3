import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './main'
import { Node3ConfigurationDTO } from '~/dto/node3_configuration_dto'
import { Node3WaterPumpLogDTO } from '~/dto/node3_water_pump_log_dto'

export const state = () => ({
  totalWaterPumped: 0,
  waterPumpLogs: [] as Node3WaterPumpLogDTO[],
  waterPumpLogsOfWeek: [] as Node3WaterPumpLogDTO[],
})

export type Node3ModuleState = ReturnType<typeof state>

export const getters: GetterTree<Node3ModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<Node3ModuleState> = {
  setTotalWaterPumped: (state, totalWaterPumped) => {
    state.totalWaterPumped = totalWaterPumped
  },
  setWaterPumpLogs: (state, waterPumpLogs) => {
    state.waterPumpLogs = waterPumpLogs;
  },
  setWaterPumpLogsOfWeek: (state, waterPumpLogs) => {
    state.waterPumpLogsOfWeek = waterPumpLogs;
  }
}

export const actions: ActionTree<Node3ModuleState, MQTTModuleState> = {
  fetchConfiguration: async ({ commit }) => {
    try {
      const response = await $axios.get('node3/configuration')
      commit(
        'main/setNode3Configuration',
        response.data as Node3ConfigurationDTO,
        {
          root: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },

  fetchAllWaterPumpLogs: async ({ commit }) => {
    try {
      const response = await $axios.get('node3/water-pump-logs')
      const dataList: Node3WaterPumpLogDTO[] = response.data
      commit('setWaterPumpLogs', dataList)
    } catch (e) {
      console.log(e)
    }
  },

  fetchAllWaterPumpLogsOfWeek: async ({ commit }) => {
    try {
      const response = await $axios.get('node3/water-pump-logs/week')
      const dataList: Node3WaterPumpLogDTO[] = response.data
      commit('setWaterPumpLogsOfWeek', dataList)
    } catch (e) {
      console.log(e)
    }
  },

  fetchTotalWaterPumped: async ({ commit }) => {
    try {
      const response = await $axios.get('node3/water-pump-logs/total/today')
      commit('setTotalWaterPumped', response.data.total ?? 0)
    } catch (e) {
      console.log(e)
    }
  },
}
