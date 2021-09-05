import { modalTypes } from './modalTypes';

export const modalHide = (payload) => ({
  type: modalTypes.HIDE_MODAL,
  payload,
});

export const modalShow = (payload) => ({
  type: modalTypes.SHOW_MODAL,
  payload,
});
