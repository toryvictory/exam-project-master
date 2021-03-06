import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import UserApi from './UserApi';
import PasswordApi from './PasswordApi';
import ContestApi from './ContestApi';
import ChatApi from './ChatApi';
import PayApi from './PayApi';
import OfferApi from './OfferApi';

const {
  api: { http },
} = config;

const client = axios.create(http);

export const auth = new AuthApi({ client });
export const userApi = new UserApi({ client });
export const contestApi = new ContestApi({ client });
export const chatApi = new ChatApi({ client });
export const payApi = new PayApi({ client });
export const offerApi = new OfferApi({ client });
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
