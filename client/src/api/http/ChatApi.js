class ChatApi {
  #_client;

  constructor({ client }) {
    this.#_client = client;
  }

  /**
   *
   * @returns {Promise}
   */
 getPreviewChat = () => this.#_client.post('getPreview');

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  getDialog = (data) => this.#_client.post('getChat', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  newMessage = (data) => this.#_client.post('newMessage', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  changeChatFavorite = (data) => this.#_client.post('favorite', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  changeChatBlock = (data) => this.#_client.post('blackList', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
 getCatalogList = (data) => this.#_client.post('getCatalogs', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  addChatToCatalog = (data) => this.#_client.post('addNewChatToCatalog', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  createCatalog = (data) => this.#_client.post('createCatalog', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  deleteCatalog = (data) => this.#_client.post('deleteCatalog', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
 removeChatFromCatalog = (data) => this.#_client.post('removeChatFromCatalog', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  changeCatalogName = (data) => this.#_client.post('updateNameCatalog', data);
}

export default ChatApi;
