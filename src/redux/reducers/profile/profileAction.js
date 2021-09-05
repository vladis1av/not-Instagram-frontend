import { userApi } from '../../../services/api';
import { profileTypes } from './profileTypes';

export const setProfile = (userData) => ({
  type: profileTypes.SET_PROFILE,
  payload: userData,
});

export const setLoaded = (bool) => ({
  type: profileTypes.SET_LOADED,
  payload: bool,
});

export const setFollow = (payload) => ({
  type: profileTypes.SET_FOLLOW,
  payload,
});

export const fetchUserProfile = (id) => {
  return async (dispatch) => {
    dispatch(setLoaded(false));
    try {
      const fetchedUser = await userApi.fetchUser(id);
      dispatch(setProfile(fetchedUser));
    } catch (error) {
      dispatch(setLoaded(false));
      console.log(error);
    }
  };
};
