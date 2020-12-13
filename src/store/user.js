const state = () => ({
  jwt: sessionStorage.getItem('jwt'),
  data: null,
})

const getters = {}

const actions = {}

const mutations = {
  setJwt: (state, value) => {
    state.jwt = value
    sessionStorage.setItem('jwt', value)
  },
  setUser: (state, value) => {
    state.data = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
