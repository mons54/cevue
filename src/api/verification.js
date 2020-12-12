import axios from '@/services/axios'

export function register(params) {
  return axios.post('/verification/register', params)
}

export function sendRegister(params) {
  return axios.post('/verification/send/register', params)
}
