const { Model } = require('sequelize');
const { MODERATION_STATUS_PENDING, MODERATION_STATUS_APPROVED, MODERATION_STATUS_REJECTED } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({ User, Contest, Rating }) {
      Offer.belongsTo(User, {
        foreignKey: 'userId',
      });
      Offer.belongsTo(Contest, {
        foreignKey: 'contestId',
      });
      Offer.hasOne(Rating, {
        foreignKey: 'offerId',
      });
    }
  }
  Offer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
        },
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Contest',
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      moderationStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [[
            MODERATION_STATUS_PENDING,
            MODERATION_STATUS_APPROVED,
            MODERATION_STATUS_REJECTED]],
        },
      },
    },
    {
      sequelize,
      modelName: 'Offer',
    },
  );
  return Offer;
};
