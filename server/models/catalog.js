const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User }) {
      Catalog.belongsTo(User, {
        foreignKey: 'userId',
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
