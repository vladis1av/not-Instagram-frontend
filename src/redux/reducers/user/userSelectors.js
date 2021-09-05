import { createSelector } from 'reselect';
import { loadingStatusTypes } from './userTypes';

export const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectIsReady = createSelector(
  [selectUser],
  (user) =>
    user.loadingStatus !== loadingStatusTypes.NEVER &&
    user.loadingStatus !== loadingStatusTypes.LOADING,
);
