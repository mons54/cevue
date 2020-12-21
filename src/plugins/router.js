import Vue from 'vue'
import VueRouter from 'vue-router'
import { locale } from '@/api/locale'
import Home from '@/views/Home'
import Login from '@/views/Login'
import LoginVerificationMobile from '@/views/LoginVerificationMobile'
import Register from '@/views/Register'
import RegisterVerificationEmail from '@/views/RegisterVerificationEmail'
import RegisterVerificationMobile from '@/views/RegisterVerificationMobile'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/login/verification/mobile',
    name: 'loginVerificationMobile',
    component: LoginVerificationMobile,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/register/verification/email',
    name: 'registerVerificationEmail',
    component: RegisterVerificationEmail,
  },
  {
    path: '/register/verification/mobile',
    name: 'registerVerificationMobile',
    component: RegisterVerificationMobile,
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]

export default new VueRouter({
    base: `/${locale}`,
    mode: 'history',
    routes,
})
