const createHttpError = require('http-errors');
const {
  sequelize, Catalog, ConversationCatalogs, UserConversations,
} = require('../models');

module.exports.createCatalog = async (req, res, next) => {
  let transaction;
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      catalogName,
      chatId,
    },
  } = req;
  try {
    transaction = await sequelize.transaction();
    const catalog = await Catalog.create({
      catalogName,
      userId,
    }, {
      transaction,
    });
    const conversation = await UserConversations.findOne({
      where: {
        conversationId: chatId,
        userId,
      },
    });
    if (!conversation) {
      throw createHttpError(403, 'User doesn\'t have rights to access requested chat');
    }
    await ConversationCatalogs.create({
      catalogId: catalog.id,
      conversationId: chatId,
    }, {
      transaction,
    });
    const catalogData = catalog.dataValues;
    catalogData.conversationId = chatId;
    catalogData.chats = [chatId];
    await transaction.commit();
    res.send(catalogData);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
  } = req;
  try {
    const catalogs = await Catalog.findAll({
      where: {
        userId,
      },
      include: [{
        model: ConversationCatalogs,
        as: 'conversationCatalog',
        required: true,
        attributes: ['conversationId'],
      }],
    });
    const catalogsData = catalogs.map((catalog) => ({
      id: catalog.id,
      catalogName: catalog.catalogName,
      chats: catalog.conversationCatalog.map((i) => i.conversationId),
    }));
    res.send(catalogsData);
  } catch (err) {
    next(err);
  }
};
