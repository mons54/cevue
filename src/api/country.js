import axios from '@/services/axios'

export function getCountries() {
  return axios.get('/country')
}
