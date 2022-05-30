import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Client } from 'paho-mqtt'
import { showToast } from '~/utils/toast_helpers'
import { NodeStatusDTO } from '~/dto/node_status_dto'
import { Node1ConfigurationDTO } from '~/dto/node1_configuration_dto'
import { Node3ConfigurationDTO } from '~/dto/node3_configuration_dto'
import { WeatherDataDTO } from '~/dto/weather_data_dto'

export const state = () => ({
  client: {} as Client,
  isConnected: false,
  node1Status: {} as NodeStatusDTO,
  node2Status: {} as NodeStatusDTO,
  node3Status: {} as NodeStatusDTO,
  node1Configuration: {} as Node1ConfigurationDTO,
  node3Configuration: {} as Node3ConfigurationDTO,
  weatherData: {} as WeatherDataDTO,
})

export type MQTTModuleState = ReturnType<typeof state>

export const getters: GetterTree<MQTTModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<MQTTModuleState> = {
  setClient: (state, client) => {
    state.client = client
  },
  setIsConnected: (state, isConnected) => {
    state.isConnected = isConnected
  },
  setNode1Status: (state, node1Status) => {
    state.node1Status = node1Status
  },
  setNode2Status: (state, node2Status) => {
    state.node2Status = node2Status
  },
  setNode3Status: (state, node3Status) => {
    state.node3Status = node3Status
  },
  setNode1Configuration: (state, node1Configuration) => {
    state.node1Configuration = node1Configuration
  },
  setNode3Configuration: (state, node3Configuration) => {
    state.node3Configuration = node3Configuration
  },
  setWeatherData: (state, weatherData) => {
    state.weatherData = weatherData
  },
}

export const actions: ActionTree<MQTTModuleState, MQTTModuleState> = {
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
        dispatch('_onConnect')
        commit('setIsConnected', true)
        showToast('Connected to MQTT Broker')
      },
      onFailure: () => {
        showToast('Could not connect to MQTT Broker', 'is-error')
      },
    })
  },

  _onConnect: ({ state, commit }) => {
    state.client.subscribe('website/#')
    state.client.subscribe('node1/#')
    state.client.subscribe('node2/#')
    state.client.subscribe('node3/#')
    state.client.subscribe('weather/#')

    state.client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        showToast(
          `Connection to MQTT Broker lost: ${responseObject.errorMessage}`,
          'is-error'
        )
      }
    }

    state.client.onMessageArrived = (message) => {
      let parsedData
      switch (message.destinationName) {
        case 'weather/latest':
          parsedData = JSON.parse(message.payloadString)
          commit('setWeatherData', parsedData.data as WeatherDataDTO)
          showToast('Weather Data has been updated', 'is-info')
          break
        case 'node1/status':
          parsedData = JSON.parse(message.payloadString)
          commit('setNode1Status', parsedData.data as NodeStatusDTO)
          showToast('Soil Moisture Node status has been updated')
          break
        case 'node2/status':
          parsedData = JSON.parse(message.payloadString)
          commit('setNode2Status', parsedData.data as NodeStatusDTO)
          showToast('Plant Cover Node status has been updated')
          break
        case 'node2/notifications/error':
          parsedData = JSON.parse(message.payloadString)
          showToast(parsedData.message, 'is-danger')
          break
        case 'node3/status':
          parsedData = JSON.parse(message.payloadString)
          commit('setNode3Status', parsedData.data as NodeStatusDTO)
          showToast('Water Pump Node status has been updated')
          break
        case 'node3/notifications/logs':
          parsedData = JSON.parse(message.payloadString)
          showToast(
            `Water pump has finished pumping ${parsedData.data.pumped_litres} litre(s)`
          )
          break
        case 'node3/notifications/error':
          parsedData = JSON.parse(message.payloadString)
          showToast(parsedData.data.message, 'is-danger')
          break
      }
    }
  },

  getNode1Status: ({ state }) => {
    state.client.send('node1/get-status', '')
  },

  getNode2Status: ({ state }) => {
    state.client.send('node2/get-status', '')
  },

  getNode3Status: ({ state }) => {
    state.client.send('node3/get-status', '')
  },

  updateNode1Configuration: ({ state }, configuration) => {
    state.client.send(
      'node1/update-configuration',
      JSON.stringify({ data: configuration })
    )
    showToast('Configuration updated.')
  },

  sendNode2CoverCommand: ({ state }, command) => {
    state.client.send(
      'node2/cover-commands',
      JSON.stringify({ data: { cover_command: command } })
    )
    showToast('Command Sent')
  },

  sendNode3WaterPumpCommand: ({ state }, litres) => {
    state.client.send(
      'node3/water-pump-commands',
      JSON.stringify({ data: { litres_to_pump: litres } })
    )
    showToast('Command Sent')
  },

  updateNode3Configuration: ({ state }, configuration) => {
    state.client.send(
      'node3/update-configuration',
      JSON.stringify({ data: configuration })
    )
    showToast('Configuration updated.')
  },
}
