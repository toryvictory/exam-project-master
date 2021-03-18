const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConversationCatalogs extends Model {
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
