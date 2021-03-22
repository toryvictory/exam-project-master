import React from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const {
    favoriteList,
    participants,
    blackList,
    conversationId,
    text,
    createAt,
    isInterlocutorBlackList,
  } = chatPreview;
  const { avatar } = interlocutor;
  return (
    <div
      className={styles.previewChatBox}
      onClick={() => goToExpandedDialog({
        interlocutor,
        conversationData: {
          participants,
          conversationId,
          blackList,
          favoriteList,
          isInterlocutorBlackList,
        },
      })}
    >
      <img
        src={
              avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
          }
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            onClick={(event) => changeFavorite(
              {
                interlocutorId: interlocutor.id,
                conversationId,
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
                interlocutorId: interlocutor.id,
                conversationId,
                blackListFlag: !blackList,
              },
              event,
            )}
            className={classNames({
              'fas fa-user-lock': !blackList,
              'fas fa-unlock': blackList,
            })}
          />
          <i
            onClick={(event) => catalogOperation(event, conversationId)}
            className={classNames({
              'far fa-plus-square':
                chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle':
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
