import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#ffc107',
        secondary: '#607d8b',
        accent: '#ff9800',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#03a9f4',
        success: '#8bc34a',
      },
    },
  },
})
