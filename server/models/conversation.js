const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ Message, Catalog, ConversationCatalogs }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
      });
      Conversation.belongsToMany(Catalog, {
        through: ConversationCatalogs,
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
