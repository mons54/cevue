import Vue from 'vue'
import VueRouter from 'vue-router'
import { locale } from '@/api/locale'
import About from '@/views/About'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default new VueRouter({
    base: `/${locale}`,
    mode: 'history',
    routes,
})
