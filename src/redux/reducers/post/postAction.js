import { postTypes } from './postTypes';

export const setPost = (postData) => ({
  type: postTypes.SET_POST,
  payload: postData,
});

export const setLoaded = (bool) => ({
  type: postTypes.SET_LOADED,
  payload: bool,
});

export const toggleLike = (payload) => ({
  type: postTypes.TOGGLE_LIKE,
  payload: payload,
});
