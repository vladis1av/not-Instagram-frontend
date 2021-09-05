import axios from 'axios';

import { API_URL } from '../../../core/axios';
import { authApi } from '../../../services/api';
import { userTypes, loadingStatusTypes } from './userTypes';

export const setUser = (userData) => ({
  type: userTypes.SET_USER,
  payload: userData,
});

export const setUserAuth = (bool) => ({
  type: userTypes.SET_AUTH,
  payload: bool,
});

export const setUserLoading = (loadingStatus) => ({
  type: userTypes.SET_LOADING,
  payload: loadingStatus,
});

export const updateUserData = (userData) => ({
  type: userTypes.UPDATE_USER_DATA,
  payload: userData,
});

export const login = (userData) => {
  return async (dispatch) => {
    dispatch(setUserLoading(loadingStatusTypes.LOADING));
    try {
      const res = await authApi.login(userData);
      localStorage.setItem('token', res.data.accessToken);
      dispatch(setUser(res.data.user));
    } catch (error) {
      dispatch(setUserLoading(loadingStatusTypes.ERROR));
      console.error(error.response?.data?.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      dispatch(setUserLoading(loadingStatusTypes.LOADED));
      dispatch(setUser({}));
      dispatch(setUserAuth(false));
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    dispatch(setUserLoading(loadingStatusTypes.LOADING));
    try {
      const res = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', res.data.accessToken);
      dispatch(setUser(res.data.user));
    } catch (error) {
      dispatch(setUserLoading(loadingStatusTypes.ERROR));
      console.error(error.response?.data?.message);
    }
  };
};
