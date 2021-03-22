import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from '../../../../actions/actionCreator';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const { avatar, firstName } = props.interlocutor;
  const {
    backToDialogList, chatData, userId, favoriteList, blackList,
  } = props;
  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`}
          alt="back"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
                avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
              }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              onClick={(event) => changeFavorite(
                {
                  // participants: chatData.participants,
                  favoriteFlag: !favoriteList,
                },
                event,
              )}
              className={classNames({
                'far fa-heart': !favoriteList,
                'fas fa-heart': favoriteList,
              })}
            />
            <i
              onClick={(event) => changeBlackList(
                {
                  // participants: chatData.participants,
                  blackListFlag: !blackList,
                },
                event,
              )}
              className={classNames({
                'fas fa-user-lock': !blackList,
                'fas fa-unlock': blackList,
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor, chatData, messagesPreview } = state.chatStore;
  const { favoriteList, blackList } = messagesPreview;
  return {
    interlocutor, chatData, favoriteList, blackList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
