import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './mqtt'
import { Node3ConfigurationDTO } from '~/dto/node3_configuration_dto'

export const state = () => ({})

export type Node3ModuleState = ReturnType<typeof state>

export const getters: GetterTree<Node3ModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<Node3ModuleState> = {}

export const actions: ActionTree<Node3ModuleState, MQTTModuleState> = {
  fetchConfiguration: async ({ commit }) => {
    try {
      const response = await $axios.get('node3/configuration')
      commit(
        'mqtt/setNode3Configuration',
        response.data as Node3ConfigurationDTO,
        {
          root: true,
        }
      )
    } catch (e) {
      console.log(e)
    }
  },
}
