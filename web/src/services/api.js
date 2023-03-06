import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'ru.token': token } = parseCookies()

const userApi = axios.create({
    baseURL: 'http://localhost:3001'
})

if(token) {
    userApi.defaults.headers['Authorization'] = `Bearer ${token}`
}

export {userApi}