import { dialogsTypes } from './dialogsTypes';

const initialState = {
  dialogs: [],
  unreadDialogs: 0,
  currentDialog: null,
  isLoaded: false,
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case dialogsTypes.SET_DIALOGS:
      return { ...state, dialogs: action.payload, isLoaded: true };

    case dialogsTypes.SET_CURRENT_DIALOG:
      return { ...state, currentDialog: action.payload };

    case dialogsTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    case dialogsTypes.SET_READED_LAST_MESSAGE:
      return {
        ...state,
        unreadDialogs:
          state.currentDialog && state.unreadDialogs > 0
            ? state.unreadDialogs - 1
            : state.unreadDialogs,
        dialogs: state.dialogs.map((dialog) => {
          if (
            dialog.lastMessage &&
            dialog._id === action.payload.dialogId &&
            dialog.lastMessage.user._id !== action.payload.userId
          ) {
            dialog.lastMessage.read = true;
          }
          return dialog;
        }),
      };

    case dialogsTypes.SET_UNREAD_DIALOGS:
      return {
        ...state,
        unreadDialogs:
          state.unreadDialogs !== action.payload
            ? action.payload
            : state.unreadDialogs,
      };

    default:
      return state;
  }
};

export default dialogsReducer;
