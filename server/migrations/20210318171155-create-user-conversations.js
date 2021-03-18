module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserConversations', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
        },
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Conversations',
        },
      },
      blackList: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favoriteList: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserConversations');
  },
};
