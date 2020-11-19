import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import vuetify from '@/plugins/vuetify'
import '@/assets/scss/app.scss'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
