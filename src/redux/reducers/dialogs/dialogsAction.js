import { dialogsApi } from '../../../services/api';
import { dialogsTypes } from './dialogsTypes';

export const setDialogs = (items) => ({
  type: dialogsTypes.SET_DIALOGS,
  payload: items,
});

export const setCurrentDialog = (currentDialogId) => ({
  type: dialogsTypes.SET_CURRENT_DIALOG,
  payload: currentDialogId,
});

export const setLoaded = (bool) => ({
  type: dialogsTypes.SET_LOADED,
  payload: bool,
});

export const updateReadedStatus = ({ userId, dialogId }) => ({
  type: dialogsTypes.SET_READED_LAST_MESSAGE,
  payload: {
    userId,
    dialogId,
  },
});

export const setUnreadDialogs = (count) => ({
  type: dialogsTypes.SET_UNREAD_DIALOGS,
  payload: count,
});

export const fetchDialogs = () => {
  return async (dispatch) => {
    dispatch(setLoaded(false));
    try {
      const res = await dialogsApi.getAll();
      dispatch(setDialogs(res));
    } catch (error) {
      dispatch(setLoaded(false));
      console.error(error);
    }
  };
};

export const fetchUnreadDialogsCount = () => {
  return async (dispatch) => {
    try {
      const res = await dialogsApi.getUnreadDialogsCount();
      dispatch(setUnreadDialogs(res.unreadDialogsCount));
      return res.unreadDialogsCount;
    } catch (error) {
      console.error(error);
    }
  };
};
