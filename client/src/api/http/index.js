import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';

const {
  api: { http },
} = config;

const client = axios.create(http);

export const auth = new AuthApi({ client });

client.interceptors.request.use(
    config => {
      if (auth.token) {
        config.headers['Authorization'] = `Bearer ${auth.token}`;
      }
      return config;
    },
    err => Promise.reject(err)
);

export default client;
