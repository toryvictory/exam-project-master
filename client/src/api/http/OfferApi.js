class OfferApi {
  #_client;

  constructor({ client }) {
    this.#_client = client;
  }

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  setNewOffer = (data) => this.#_client.post('setNewOffer', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  setOfferStatus = (data) => this.#_client.post('setOfferStatus', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  changeMark = (data) => this.#_client.post('changeMark', data);

  /**
   *
   * @returns {Promise}
   */
  getOffers = () => this.#_client.get('getOffers');
}

export default OfferApi;
