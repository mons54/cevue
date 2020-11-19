import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#2a9d8f',
        secondary: '#264653',
        accent: '#e9c46a',
      },
    },
  },
})
