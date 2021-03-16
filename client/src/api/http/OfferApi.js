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
   * @param {object} params
   * @param {number} params.limit
   * @param {number} params.page
   * @param {string} params.status
   * @returns {Promise}
   */
  getOffers = (params) => this.#_client.get('getOffers', {
    params,
  });

  /**
   *
   * @param {object} data
   * @param {number} data.id
   * @param {string} data.moderationStatus
   * @returns {Promise}
   */
  changeOfferModerationStatus = (data) => this.#_client.patch('changeOfferModerationStatus', data);
}

export default OfferApi;
