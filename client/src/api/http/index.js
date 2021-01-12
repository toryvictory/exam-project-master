import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import UserApi from './UserApi';

const {
  api: { http },
} = config;

const client = axios.create(http);

export const auth = new AuthApi({ client });
export const userApi = new UserApi({ client });

client.interceptors.request.use(
  auth.interceptRequest,
  (err) => Promise.reject(err),
);

client.interceptors.response.use(
  (response) => response,
  auth.interceptResponseError,
);

export default client;
