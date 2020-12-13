import axios from '@/services/axios'

export function register(params) {
  return axios.post('/user/register', params)
}

export function getMe() {
  return axios.get('/user/me')
}
