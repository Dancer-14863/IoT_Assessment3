import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './main'
import { Node1ConfigurationDTO } from '~/dto/node1_configuration_dto'

export const state = () => ({
  averageSoilMoisture: 0,
})

export type Node1ModuleState = ReturnType<typeof state>

export const getters: GetterTree<Node1ModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<Node1ModuleState> = {
  setAverageSoilMoisture: (state, averageSoilMoisture) => {
    state.averageSoilMoisture = averageSoilMoisture
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
