import { getCountries } from '@/api/country'

const state = () => ({
  countries: [],
})

const getters = {
  userCountry(state) {
    if (!state.countries)
      return null

    let country

    if (typeof navigator.language === 'string')
      country = state.countries.find(country => country.iso === navigator.language.slice(-2))

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
