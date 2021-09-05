import { loadingStatusTypes, userTypes } from './userTypes';

const initialState = {
  currentUser: {},
  isAuth: false,
  loadingStatus: loadingStatusTypes.NEVER,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return {
        ...state,
        loadingStatus: loadingStatusTypes.LOADED,
        isAuth: true,
        currentUser: action.payload,
      };

    case userTypes.SET_AUTH:
      return { ...state, isAuth: action.payload };

    case userTypes.SET_LOADING:
      return { ...state, loadingStatus: action.payload };

    case userTypes.UPDATE_USER_DATA:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
      };

    default:
      return state;
  }
};

export default userReducer;
