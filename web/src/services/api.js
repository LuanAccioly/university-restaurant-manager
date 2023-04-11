import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'ru.token': token } = parseCookies();

const userApi = axios.create({
  baseURL: 'http://localhost:3001',
});

const cozinhaApi = axios.create({
  baseURL: 'http://localhost:3002',
});

const pagamentoApi = axios.create({
  baseURL: 'http://localhost:5000',
});

if (token) {
  userApi.defaults.headers['Authorization'] = `Bearer ${token}`;
  cozinhaApi.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export { userApi, cozinhaApi, pagamentoApi };
