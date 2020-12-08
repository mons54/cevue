import Vue from 'vue'
import VueRouter from 'vue-router'
import { locale } from '@/api/locale'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
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
