const {
  Model,
} = require('sequelize');

module.exports = (sequelize) => {
  class Conversation extends Model {
    static associate({
      Message, Catalog, ConversationCatalogs, User, UserConversations,
    }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
      });
      Conversation.belongsToMany(Catalog, {
        through: ConversationCatalogs,
        foreignKey: 'conversationId',
      });
      Conversation.belongsToMany(User, {
        through: UserConversations,
        foreignKey: 'conversationId',
      });
      Conversation.hasMany(UserConversations, {
        foreignKey: 'conversationId',
        as: 'userconversation',
      });
      Conversation.hasMany(ConversationCatalogs, {
        foreignKey: 'catalogId',
        as: 'conversationCatalog',
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
