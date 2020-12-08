import Vue from 'vue'
import Vuex from 'vuex'
import country from '@/store/country'
import locale from '@/store/locale'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    country,
    locale,
  },
})
