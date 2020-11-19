import Vue from 'vue'
import App from '@/App.vue'
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import '@/assets/scss/material-kit.scss'
import '@/assets/scss/app.scss'

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
