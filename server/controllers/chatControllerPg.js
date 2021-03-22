const createHttpError = require('http-errors');
const { Op } = require('sequelize');
const {
  sequelize, User, Conversation, Message, UserConversations,
} = require('../models');
const controller = require('../socketInit');

const findConversation = async (userId, interlocutorId) => {
  const conversation = await UserConversations.findAll({
    where: {
      userId,
    },
    attributes: ['conversationId'],
    include: [
      {
        model: Conversation,
        as: 'conversation',
        required: true,
        attributes: ['id'],
        include: [{
          model: UserConversations,
          as: 'userconversation',
          attributes: ['conversationId'],
          where: { userId: interlocutorId },
          required: true,
        },
        ],
      },
    ],
  });
  if (Array.isArray(conversation) && conversation.length === 1) return conversation[0];
  return null;
};

module.exports.addMessage = async (req, res, next) => {
  let transaction;
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      recipient,
      messageBody,
      interlocutor,
    },
  } = req;
  try {
    transaction = await sequelize.transaction();
    let conversation = await findConversation(userId, interlocutor.id);

    if (!conversation) {
      conversation = await Conversation.create({ transaction });
      await UserConversations.create({
        conversationId: conversation.id,
        userId,
      }, { transaction });
      await UserConversations.create({
        conversationId: conversation.id,
        userId: recipient,
      }, { transaction });
    }
    const { conversationId } = conversation;

    const message = await Message.create({
      body: messageBody,
      conversation: conversationId,
      sender: userId,
    }, { transaction });

    const preview = {
      _id: conversationId,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      blackList: conversation.blackList,
      favoriteList: conversation.favoriteList,
    };
    const interlocutorData = await User.findByPk(userId);
    if (!interlocutorData) {
      throw createHttpError(404, 'user not found');
    }
    controller.getChatController().emitNewMessage(recipient, {
      message: message.dataValues,
      preview: {
        _id: conversationId,
        sender: userId,
        text: messageBody,
        createAt: message.createdAt,
        blackList: conversation.blackList,
        favoriteList: conversation.favoriteList,
        interlocutor: interlocutorData.dataValues,
      },
    });
    await transaction.commit();
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor }),
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
    body: {
      interlocutorId,
    },
  } = req;
  try {
    const conversation = await findConversation(userId, interlocutorId);
    let messages = [];
    if (conversation) {
      const { conversationId } = conversation;
      messages = await Message.findAll({
        where: {
          conversation: conversationId,
        },
        raw: true,
      });
    }
    const interlocutor = await User.findOne({ where: { id: interlocutorId } });
    if (!interlocutor) {
      throw createHttpError(404, 'user with specified interlocutorId doesn\'t exist');
    }
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  const {
    tokenPayload:
      {
        userId,
      },
  } = req;
  try {
    const conversations = await UserConversations.findAll({
      where: {
        userId,
      },
      attributes: ['userId', 'conversationId', 'blackList', 'favoriteList'],
      include: [
        {
          model: Conversation,
          as: 'conversation',
          attributes: ['id'],
          include: [{
            model: UserConversations,
            as: 'userconversation',
            attributes: ['userId', 'blackList', 'favoriteList'],
            where: { userId: { [Op.not]: userId } },
            include: [{
              model: User,
              attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
              as: 'interlocutor',
            }],
          },
          ],
        },
      ],
    });

    const conversationsWithLastMessage = await Promise.all(conversations.map(async (i) => {
      const item = i.dataValues;
      delete item.conversation;
      const [msg] = await Message.findAll({
        where: {
          conversation: item.conversationId,
        },
        order: [['createdAt', 'DESC']],
        limit: 1,
        required: true,
        raw: true,
        attributes: {
          include: ['id', 'sender', ['body', 'text'], ['createdAt', 'createAt']],
          exclude: ['body', 'createdAt', 'conversation', 'updatedAt'],
        },
      });
      item.isInterlocutorBlackList = i.conversation.userconversation[0].blackList;
      item.interlocutor = i.conversation.userconversation[0].interlocutor.dataValues;
      Object.assign(item, msg);
      return item;
    }));

    res.send(conversationsWithLastMessage);
  } catch (err) {
    next(err);
  }
};
