import socketIoClient from 'socket.io-client';
import config from '../../../app/config';

const { api: { ws: { baseURL } } } = config;

class WebSocket {
  constructor(dispatch, getState, room) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = socketIoClient(`${baseURL}/${room}`, {
      origins: 'localhost:*',
    });
    this.listen();
  }

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  anotherSubscribes = () => {};
}

export default WebSocket;
