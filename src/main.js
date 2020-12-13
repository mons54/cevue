import Vue from 'vue'
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'

import '@/assets/scss/app.scss'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
