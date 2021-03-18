const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ Message }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
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
