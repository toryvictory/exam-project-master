class PasswordApi {
  #_client;

  constructor({ client }) {
    this.#_client = client;
  }

  /**
   *
   * @param {object} data
   * @param {string} data.email
   * @param {string} data.password
   * @returns {Promise}
   */
  resetPassword = (data) => this.#_client.post('/resetPassword', data);

  /**
   *
   * @param {object} token
   * @returns {Promise}
   */
  confirmPasswordReset = (token) => this.#_client.post('/confirmPasswordReset', token);
}

export default PasswordApi;
