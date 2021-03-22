const createHttpError = require('http-errors');
const {
  Catalog, UserConversations,
} = require('../models');

module.exports.participatesInChat = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      chatId,
    },
  } = req;
  try {
    const conversation = await UserConversations.findOne({
      where: {
        conversationId: chatId,
        userId,
      },
    });
    if (!conversation) {
      throw createHttpError(403, 'User doesn\'t have rights to access requested chat');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.ownsCatalog = async (req, res, next) => {
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
    const catalog = await Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });
    if (!catalog) {
      throw createHttpError(403, 'User doesn\'t have rights to access requested catalog');
    }
    next();
  } catch (err) {
    next(err);
  }
};
