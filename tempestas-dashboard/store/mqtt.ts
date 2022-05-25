import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Client } from 'paho-mqtt'

export const state = () => ({
  client: {} as Client,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setClient: (state, client) => {
    state.client = client
  },
}

export const actions: ActionTree<RootState, RootState> = {
  connect: ({ commit, dispatch }) => {
    const clientId = `website-${Math.random() * 100}`
    const client = new Client(
      process.env.mqttBroker ?? '',
      +(process.env.mqttPort ?? ''),
      clientId
    )
    client.connect({
      userName: process.env.mqttUsername,
      password: process.env.mqttPassword,
      cleanSession: true,
      useSSL: true,
      onSuccess: () => {
        commit('setClient', client)
        dispatch('_initSubscriptions')
      },
      onFailure: () => {
        console.error('Could not connect to MQTT broker')
      },
    })
  },

  _initSubscriptions: ({ state }) => {
    state.client.subscribe('website')
  },
}
