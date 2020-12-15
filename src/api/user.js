import axios from '@/services/axios'

export function login(params) {
  return axios.post('/user/login', params)
}

export function register(params) {
  return axios.post('/user/register', params)
}

export function getMe() {
  return axios.get('/user/me')
}
