import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { $axios } from '~/utils/api'
import { MQTTModuleState } from './main'
import { WeatherDataDTO } from '~/dto/weather_data_dto'

export const state = () => ({
  weatherDataList: [] as WeatherDataDTO[],
})

export type WeatherModuleState = ReturnType<typeof state>

export const getters: GetterTree<WeatherModuleState, MQTTModuleState> = {}

export const mutations: MutationTree<WeatherModuleState> = {
  setWeatherDataList: (state, weatherDataList) => {
    state.weatherDataList = weatherDataList
  },
}

export const actions: ActionTree<WeatherModuleState, MQTTModuleState> = {
  fetchLatestWeatherData: async ({ commit }) => {
    try {
      const response = await $axios.get('weather/latest')
      commit('main/setWeatherData', response.data as WeatherDataDTO, {
        root: true,
      })
    } catch (e) {
      console.log(e)
    }
  },

  fetchAllWeatherData: async ({ commit }) => {
    try {
      const response = await $axios.get('weather')
      commit('setWeatherDataList', response.data as WeatherDataDTO[])
    } catch (e) {
      console.log(e)
    }
  },
}
