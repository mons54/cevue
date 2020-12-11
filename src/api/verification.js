import axios from '@/services/axios'

export function sendRegister(params) {
  return axios.post('/verification/send/register', params)
}
