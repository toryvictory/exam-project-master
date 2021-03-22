const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation, ConversationCatalogs }) {
      Catalog.belongsTo(User, {
        foreignKey: 'userId',
      });
      Catalog.belongsToMany(Conversation, {
        through: ConversationCatalogs,
        foreignKey: 'catalogId',
      });
      Catalog.hasMany(ConversationCatalogs, {
        foreignKey: 'catalogId',
        as: 'conversationCatalog',
      });
    }
  }
  Catalog.init({
    catalogName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
      },
    },
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};
