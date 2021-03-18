module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ConversationCatalogs', {
      conversationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Conversations',
        },
      },
      catalogId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Catalogs',
        },
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
    await queryInterface.dropTable('ConversationCatalogs');
  },
};
