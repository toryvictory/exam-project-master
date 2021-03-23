import { isEqual } from 'lodash';
import WebSocket from './WebSocket';
import CONSTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore,
} from '../../../actions/actionCreator';

class ChatSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, (data) => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;
      messagesPreview.forEach((preview) => {
        if (isEqual(preview.interlocutor.id, message.sender)) {
          preview.isInterlocutorBlackList = message.isInterlocutorBlackList;
        }
      });
      this.dispatch(
        changeBlockStatusInStore({ chatData: message, messagesPreview }),
      );
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', (data) => {
      const { message, preview } = data.message;
      const { messagesPreview } = this.getState().chatStore;
      let isNew = true;
      messagesPreview.forEach((messagePreview) => {
        if (isEqual(messagePreview.interlocutor.id, message.sender)) {
          messagePreview.text = message.body;
          messagePreview.sender = message.sender;
          messagePreview.createAt = message.createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }
      this.dispatch(addMessage({ message, messagesPreview }));
    });
  };

  subscribeChat = (id) => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = (id) => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
