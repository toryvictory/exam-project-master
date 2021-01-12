import { REFRESH_TOKEN_KEY } from '../../constants';

class AuthApi {
    #_client;

    #_token;

    constructor({ client }) {
      this.#_client = client;
      this.#_token = null;
      this.url = '/auth';

      this.#_client.interceptors.response.use(
        this.interceptResponse,
      );
    }

    get token() {
      return this.#_token;
    }

    /**
     *
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.password
     * @returns {Promise}
     */
    login = (data) => this.#_client.post(`${this.url}/login`, data);

    /**
     *
     * @param {object} data
     * @param {string} data.firstName
     * @param {string} data.lastName
     * @param {string} data.displayName
     * @param {string} data.password
     * @param {string} data.confirmPassword
     * @param {string} data.email
     * @param {string} data.role
     * @returns {Promise}
     */
    signUp = (data) => this.#_client.post(`${this.url}/signup`, data);

    /**
     *
     * @param {object} data
     * @param {string} data.refreshToken
     * @returns {Promise}
     */
    refresh = (data) => this.#_client.post(`${this.url}/refresh`, data);

    logout = () => {
      this.#_token = null;
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    };

    interceptRequest = (config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    };

    interceptResponse = (response) => {
      const {
        config: { url, baseURL },
        data,
      } = response;

      if (url.replace(baseURL, '').indexOf(this.url) === 0) {
        const {
          data: {
            tokenPair: { accessToken, refreshToken },
          },
        } = data;
        this.#_token = accessToken;
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
      return response;
    };

    interceptResponseError = async (error) => {
      const { response, config } = error;
      const { url, baseURL } = config;
      const { status } = response;

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
          return this.#_client(config);
        } catch {
          this.logout();
          throw error;
        }
      }
    };
}

export default AuthApi;
