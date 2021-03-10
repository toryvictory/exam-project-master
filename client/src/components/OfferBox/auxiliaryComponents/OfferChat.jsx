import React from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { goToExpandedDialog } from '../../../actions/actionCreator';

const OfferChat = ({ userId, interlocutor }) => {
  const dispatch = useDispatch();
  const { messagesPreview } = useSelector((store) => store.chatStore);
  const findConversationInfo = () => {
    const participants = [userId, interlocutor.id];
    participants.sort(
      (participant1, participant2) => participant1 - participant2,
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };
  const goChat = () => {
    dispatch(goToExpandedDialog({
      interlocutor,
      conversationData: findConversationInfo(),
    }));
  };
  return (
    <i role="button" onClick={goChat} onKeyPress={goChat} className="fas fa-comments" tabIndex={0} />
  );
};

OfferChat.propTypes = {
  userId: PropTypes.number.isRequired,
  interlocutor: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default OfferChat;
