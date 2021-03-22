const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConversationCatalogs extends Model {
    static associate({ Catalog, Conversation }) {
      ConversationCatalogs.belongsTo(Catalog, {
        foreignKey: 'catalogId',
        as: 'catalog',
      });
      ConversationCatalogs.belongsTo(Conversation, {
        foreignKey: 'conversationId',
        as: 'conversation',
      });
    }
  }
  ConversationCatalogs.init({
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversation',
      },
    },
    catalogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Catalog',
      },
    },
  }, {
    sequelize,
    modelName: 'ConversationCatalogs',
  });
  return ConversationCatalogs;
};
