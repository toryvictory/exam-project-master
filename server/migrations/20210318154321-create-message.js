module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conversation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
    await queryInterface.dropTable('Messages');
  },
};
