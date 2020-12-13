import axios from 'axios'
import store from '../store/index'

const headers = {}

const jwt = store.state.user.jwt

if (jwt) {
  headers['Authorization'] = `bearer ${jwt}`
}

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers,
})

instance.interceptors.response.use(response => response, error => {
  //@todo if (error.response.status === 403) Redirect or retry
  return error
})

export default instance
