class UserApi {
    #_client;

    constructor({ client }) {
      this.#_client = client;
    }

    /**
         *
         * @param {object} data
         * @returns {Promise}
         */

    updateUser = (data) => this.#_client.patch('/updateUser', data);
}

export default UserApi;
