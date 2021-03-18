const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Conversation, User }) {
      Message.belongsTo(User, {
        foreignKey: 'sender',
      });
      Message.belongsTo(Conversation, {
        foreignKey: 'conversation',
      });
    }
  }
  Message.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversation',
      },
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
      },
    },
  },
  {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
