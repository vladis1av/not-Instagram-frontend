import { createSelector } from 'reselect';

export const selectDialogs = (state) => state.dialogs;

export const selectUnreadDialogs = createSelector(
  [selectDialogs],
  (dialogs) => dialogs.unreadDialogs,
);

export const selectCurrentDialog = createSelector(
  [selectDialogs],
  (dialogs) => dialogs.currentDialog,
);

export const selectDialogsItems = createSelector(
  [selectDialogs],
  (dialogs) => dialogs.dialogs,
);
