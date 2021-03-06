const createHttpError = require('http-errors');
const {
  sequelize, Catalog, ConversationCatalogs,
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

module.exports.updateNameCatalog = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      catalogName,
      catalogId,
    },
  } = req;
  try {
    const [count, [catalog]] = await Catalog.update({ catalogName }, {
      where: {
        userId,
        id: catalogId,
      },
      returning: true,
    });
    if (count !== 1) {
      throw createHttpError(401, 'Unable to update the catalog');
    }
    res.send(catalog.dataValues);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      chatId,
      catalogId,
    },
  } = req;
  try {
    const catalog = await Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
      include: [{
        model: ConversationCatalogs,
        as: 'conversationCatalog',
        required: true,
        attributes: ['conversationId'],
      }],
    });
    await ConversationCatalogs.findOrCreate({
      where: {
        conversationId: chatId,
        catalogId,
      },
    });
    const catalogData = catalog.dataValues;
    catalogData.chats = catalog.conversationCatalog.map((i) => i.conversationId);
    res.send(catalogData);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      chatId,
      catalogId,
    },
  } = req;
  try {
    const catalog = await Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });
    await ConversationCatalogs.destroy({
      where: {
        conversationId: chatId,
        catalogId,
      },
    });
    const catalogConversations = await ConversationCatalogs.findAll({
      attributes: ['conversationId'],
      where: {
        catalogId,
      },
    });

    if (catalogConversations.length === 0) {
      await catalog.destroy();
    }
    const catalogData = catalog.dataValues;
    catalogData.chats = catalogConversations.map((i) => i.conversationId);
    res.send(catalogData);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  let transaction;
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      catalogId,
    },
  } = req;
  try {
    transaction = await sequelize.transaction();
    await ConversationCatalogs.destroy({
      where: {
        catalogId,
      },
      transaction,
    });
    await Catalog.destroy({
      where: {
        id: catalogId,
        userId,
      },
      transaction,
    });
    await transaction.commit();
    res.end();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
