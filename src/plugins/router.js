import Vue from 'vue'
import VueRouter from 'vue-router'
import { locale } from '@/api/locale'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import SignupVerificationEmail from '@/views/SignupVerificationEmail'
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
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/signup/verification/email',
    name: 'signupVerificationEmail',
    component: SignupVerificationEmail,
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
