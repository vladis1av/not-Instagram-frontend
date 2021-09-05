import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Icon, Button, DialogSidebar, Chat } from '../../components';
import { useChangeDocumentTitle } from '../../hooks';
import { setCurrentDialog } from '../../redux/reducers/dialogs/dialogsAction';
import {
  selectCurrentDialog,
  selectDialogsItems,
  selectUnreadDialogs,
} from '../../redux/reducers/dialogs/dialogsSelectors';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import { modalShow } from '../../redux/reducers/modal/modalAction';
import './Direct.scss';

const Direct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => selectCurrentUser(state));
  const unreadDialogs = useSelector((state) => selectUnreadDialogs(state));
  const currentDialog = useSelector((state) => selectCurrentDialog(state));
  const dialogs = useSelector((state) => selectDialogsItems(state));

  const addDialog = () => {
    dispatch(
      modalShow({
        component: 'CreateDialog',
      }),
    );
  };

  const setCurrentDialogId = (id) => {
    dispatch(setCurrentDialog(id));
  };

  useChangeDocumentTitle(
    `${unreadDialogs > 0 ? `(${unreadDialogs})` : ''} Входящие • Direct`,
  );

  useEffect(() => {
    if (id) {
      setCurrentDialogId(id);
    } else {
      setCurrentDialogId(null);
    }
  }, [id]);

  return (
    <div className="direct">
      <DialogSidebar
        dialogs={dialogs}
        currentUser={currentUser}
        currentDialog={currentDialog}
      />
      {id ? (
        <Chat currentDialog={currentDialog} currentUser={currentUser} />
      ) : (
        <div className="chat__message-empty__wrapper">
          <div className="chat__message-empty__wrapper__icon">
            <Icon name="direct" size="50" />
          </div>
          <h2>Ваши сообщения</h2>
          <span>Отправляйте личные фото и сообщения.</span>
          <Button variant="primary" onClick={addDialog}>
            Отправить сообщение
          </Button>
        </div>
      )}
    </div>
  );
};

export default Direct;
