const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({
      Message, Catalog, ConversationCatalogs, User, UserConversations,
    }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
      });
      Conversation.belongsToMany(Catalog, {
        through: ConversationCatalogs,
      });
      Conversation.belongsToMany(User, {
        through: UserConversations,
      });
    }
  }
  Conversation.init({
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};
