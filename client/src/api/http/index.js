import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import UserApi from './UserApi';
import PasswordApi from './PasswordApi';

const {
  api: { http },
} = config;

const client = axios.create(http);

export const auth = new AuthApi({ client });
export const userApi = new UserApi({ client });
export const passwordApi = new PasswordApi({ client });

client.interceptors.request.use(
  auth.interceptRequest,
  (err) => Promise.reject(err),
);

client.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      return auth.interceptResponseError(err);
    }
    throw err;
  },
);

export default client;
