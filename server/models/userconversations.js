const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserConversations extends Model {
  }
  UserConversations.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
      },
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversation',
      },
    },
    blackList: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    favoriteList: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'UserConversations',
  });
  return UserConversations;
};
