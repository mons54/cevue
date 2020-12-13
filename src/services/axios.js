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

export default instance
