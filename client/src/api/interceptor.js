import axios from 'axios';
import CONTANTS, { REFRESH_TOKEN_KEY } from '../constants';
import history from '../browserHistory';
import { auth } from './http';

const instance = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  // err => {
  //     console.log(err.response);
  //   if (
  //     err.response.status === 408 &&
  //     history.location.pathname !== '/login' &&
  //     history.location.pathname !== '/registration' &&
  //     history.location.pathname !== '/'
  //   ) {
  //     history.replace('/login');
  //   }
  //   return Promise.reject(err);
  // }
  async (error) => {
    const { response, config } = error;
    const { url, baseURL } = config;
    const { status } = response;

    console.log(error.response);

    if (status !== 401) {
      throw error;
    }

    if (
      status === 401
            && (url.replace(baseURL, '')) !== `${this.url}/refresh`
            && localStorage.getItem(REFRESH_TOKEN_KEY)
    ) {
      try {
        await this.refresh({
          refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        });
        return auth.client(config);
      } catch {
        this.logout();
        throw error;
      }
    }
  },
);

export default instance;
