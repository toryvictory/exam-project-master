class PayApi {
  #_client;

  constructor({ client }) {
    this.#_client = client;
  }

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  cashOut = (data) => this.#_client.post('cashout', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  payment = (data) => this.#_client.post('pay', data.formData);
}

export default PayApi;
