import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Client } from 'paho-mqtt'
import { showToast } from '~/utils/toast_helpers'
import { NodeStatusDTO } from '~/dto/node_status_dto'
import { $axios } from '~/utils/api'
import { is } from '@babel/types'
import { MQTTModuleState } from './mqtt'
import { Node1ConfigurationDTO } from '~/dto/node1_configuration_dto'
import { response } from 'express'

export const state = () => ({
  isLoading: false,
})

export type Node1ModuleState = ReturnType<typeof state>

export const getters: GetterTree<Node1ModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<Node1ModuleState> = {
  setIsLoading: (state, isLoading) => {
    state.isLoading = isLoading
  },
}

export const actions: ActionTree<Node1ModuleState, MQTTModuleState> = {
  fetchConfiguration: async ({ commit }) => {
    try {
      const response = await $axios.get('node1/configuration')
      commit('mqtt/setNode1Configuration', response.data as Node1ConfigurationDTO, {
        root: true,
      })
    } catch (e) {
      console.log(e)
    }
  },
}
