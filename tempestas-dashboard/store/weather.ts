import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './mqtt'
import { WeatherDataDTO } from '~/dto/weather_data_dto'

export const state = () => ({})

export type WeatherModuleState = ReturnType<typeof state>

export const getters: GetterTree<WeatherModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<WeatherModuleState> = {}

export const actions: ActionTree<WeatherModuleState, MQTTModuleState> = {
  fetchLatestWeatherData: async ({ commit }) => {
    try {
      const response = await $axios.get('weather/latest')
      commit('mqtt/setWeatherData', response.data as WeatherDataDTO, {
        root: true,
      })
    } catch (e) {
      console.log(e)
    }
  },
}
