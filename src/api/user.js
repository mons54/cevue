import axios from '@/services/axios'

export function createUser(params) {
  return axios.post('/user', params)
}
