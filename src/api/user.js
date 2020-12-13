import axios from '@/services/axios'

export function createUser(params) {
  return axios.post('/user', params)
}

export function getMe() {
  return axios.get('/user/me')
}
