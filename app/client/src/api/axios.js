import axios from 'axios'

import Cookies from 'js-cookie'
const cookies =  Cookies.get()

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: { 'Authorization': cookies.token }
})

export default instance