import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';
import UserApi from './UserApi';
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

client.interceptors.request.use(
  auth.interceptRequest,
  (err) => Promise.reject(err),
);

client.interceptors.response.use(
  (response) => response,
  auth.interceptResponseError,
);

export default client;
