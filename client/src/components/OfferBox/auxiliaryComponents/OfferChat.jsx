import React from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { goToExpandedDialog } from '../../../actions/actionCreator';

const OfferChat = ({ userId, interlocutor }) => {
  const dispatch = useDispatch();
  const { messagesPreview } = useSelector((store) => store.chatStore);
  const findConversationInfo = () => {
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(userId, messagesPreview[i].userId)
        && isEqual(interlocutor.id, messagesPreview[i].interlocutor.id)) {
        return {
          conversationId: messagesPreview[i].conversationId,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
          isInterlocutorBlackList: messagesPreview[i].isInterlocutorBlackList,
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
