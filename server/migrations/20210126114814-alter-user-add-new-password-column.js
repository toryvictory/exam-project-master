const { hashSync } = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'newPasswordHash',
      {
        type: Sequelize.TEXT,
        set(value) {
          this.setDataValue('newPasswordHash', hashSync(value, SALT_ROUNDS));
        },
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Users',
      'newPasswordHash',
    );
  },
};
