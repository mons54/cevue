import { getCountries } from '@/api/country'

const state = () => ({
  countries: [],
})

const getters = {
  userCountry(state) {
    if (!state.countries)
      return null

    const language = navigator.language.slice(0, 2)

    let country

    if (typeof language === 'string')
      country = state.countries.find(country => country.iso === language.toUpperCase())

    if (!country)
      country = state.countries.find(country => country.iso === 'EN')

    return country
  }
}

const actions = {
  async getCountries({ commit }) {
    if (!state.countries) {
      const { data } = await getCountries()
      commit('setCountries', data)
    }
    return state.countries
  }
}

const mutations = {
  setCountries: (state, countries) => {
    state.countries = countries
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
