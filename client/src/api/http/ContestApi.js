class ContestApi {
  #_client;

  constructor({ client }) {
    this.#_client = client;
  }

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  updateContest = (data) => this.#_client.post('updateContest', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  downloadContestFile = (data) => this.#_client.get(`downloadFile/${data.fileName}`);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  dataForContest = (data) => this.#_client.post('dataForContest', data);

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  getCustomersContests = (data) => this.#_client.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    },
  );

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
  getActiveContests = ({
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  }) => this.#_client.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

  /**
   *
   * @param {object} data
   * @returns {Promise}
   */
   getContestById = (data) => this.#_client.get('getContestById', {
     headers: {
       contestId: data.contestId,
     },
   });
}

export default ContestApi;
