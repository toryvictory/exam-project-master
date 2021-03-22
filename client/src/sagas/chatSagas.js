import { put, select } from 'redux-saga/effects';
import remove from 'lodash/remove';
import { isEqual } from 'lodash';
import ACTION from '../actions/actionTypes';
import * as Api from '../api/http';

export function* previewSaga() {
  try {
    const { data } = yield Api.chatApi.getPreviewChat();
    yield put({ type: ACTION.GET_PREVIEW_CHAT, data });
  } catch (err) {
    yield put({ type: ACTION.GET_PREVIEW_CHAT_ERROR, error: err.response });
  }
}

export function* getDialog(action) {
  try {
    const { data } = yield Api.chatApi.getDialog(action.data);
    yield put({ type: ACTION.GET_DIALOG_MESSAGES, data });
  } catch (err) {
    yield put({ type: ACTION.GET_DIALOG_MESSAGES_ERROR, error: err.response });
  }
}

export function* sendMessage(action) {
  try {
    const { data } = yield Api.chatApi.newMessage(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
    let isNew = true;
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.interlocutor.id, data.preview.interlocutor.id)) {
        preview.text = data.message.body;
        preview.sender = data.message.sender;
        preview.createAt = data.message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(data.preview);
    }
    yield put({
      type: ACTION.SEND_MESSAGE,
      data: {
        message: data.message,
        messagesPreview,
        chatData: {
          _id: data.preview._id,
          participants: data.preview.participants,
          favoriteList: data.preview.favoriteList,
          blackList: data.preview.blackList,
        },
      },
    });
  } catch (err) {
    yield put({ type: ACTION.SEND_MESSAGE_ERROR, error: err.response });
  }
}

export function* changeChatFavorite(action) {
  try {
    const { data } = yield Api.chatApi.changeChatFavorite(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.interlocutor.id, data.interlocutorId)) {
        preview.favoriteList = data.favoriteList;
      }
    });
    yield put({
      type: ACTION.CHANGE_CHAT_FAVORITE,
      data: { changedPreview: data, messagesPreview },
    });
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_FAVORITE_ERROR, error: err.response });
  }
}

export function* changeChatBlock(action) {
  try {
    const { data } = yield Api.chatApi.changeChatBlock(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
    messagesPreview.forEach((preview) => {
      if (isEqual(preview.interlocutor.id, data.interlocutorId)) {
        preview.blackList = data.blackList;
      }
    });
    yield put({
      type: ACTION.CHANGE_CHAT_BLOCK,
      data: { messagesPreview, chatData: data },
    });
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response });
  }
}

export function* getCatalogListSaga(action) {
  try {
    const { data } = yield Api.chatApi.getCatalogList(action.data);
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST, data });
  } catch (err) {
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error: err.response });
  }
}

export function* addChatToCatalog(action) {
  try {
    const { data } = yield Api.chatApi.addChatToCatalog(action.data);
    const { catalogList } = yield select((state) => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG, data: catalogList });
  } catch (err) {
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error: err.response });
  }
}

export function* createCatalog(action) {
  try {
    const { data } = yield Api.chatApi.createCatalog(action.data);
    yield put({ type: ACTION.CREATE_CATALOG_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.CREATE_CATALOG_ERROR, error: err.response });
  }
}

export function* deleteCatalog(action) {
  try {
    yield Api.chatApi.deleteCatalog(action.data);
    const { catalogList } = yield select((state) => state.chatStore);
    const newCatalogList = remove(
      catalogList,
      (catalog) => action.data.catalogId !== catalog._id,
    );
    yield put({ type: ACTION.DELETE_CATALOG_SUCCESS, data: newCatalogList });
  } catch (err) {
    yield put({ type: ACTION.DELETE_CATALOG_ERROR, error: err.response });
  }
}

export function* removeChatFromCatalogSaga(action) {
  try {
    const { data } = yield Api.chatApi.removeChatFromCatalog(action.data);
    const { catalogList } = yield select((state) => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS,
      data: { catalogList, currentCatalog: data },
    });
  } catch (err) {
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR,
      error: err.response,
    });
  }
}

export function* changeCatalogName(action) {
  try {
    const { data } = yield Api.chatApi.changeCatalogName(action.data);
    const { catalogList } = yield select((state) => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].catalogName = data.catalogName;
        break;
      }
    }
    yield put({
      type: ACTION.CHANGE_CATALOG_NAME_SUCCESS,
      data: { catalogList, currentCatalog: data },
    });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_CATALOG_NAME_ERROR, error: err.response });
  }
}
