module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Offers', 'moderationStatus', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Offers',
      'moderationStatus',
    );
  },
};
