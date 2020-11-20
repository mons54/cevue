import i18n from '@/plugins/i18n'
import { languages, locale } from '@/api/locale'

const state = () => ({
  locale,
  languages,
})

const getters = {
  language: state => state.languages.find(language => language.code === i18n.locale),
}

const actions = {}

const mutations = {
  selectSidebar: (state, value) => {
    state.selected = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
