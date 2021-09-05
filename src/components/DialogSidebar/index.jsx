import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DialogItem, Button, Icon, DialogsLoader } from '../';
import {
  fetchDialogs,
  updateReadedStatus,
} from '../../redux/reducers/dialogs/dialogsAction';
import { modalShow } from '../../redux/reducers/modal/modalAction';
import socket from '../../core/socket';
import './DialogSidebar.scss';

const DialogSidebar = ({ dialogs, currentUser, currentDialog }) => {
  const dispatch = useDispatch();

  const getDialogs = () => {
    dispatch(fetchDialogs());
  };

  const updateDialogReadedStatus = (userData) =>
    dispatch(updateReadedStatus(userData));

  const openModal = () => {
    dispatch(
      modalShow({
        component: 'CreateDialog',
      }),
    );
  };

  useEffect(() => {
    getDialogs();

    socket.on('SERVER:DIALOG_CREATED', getDialogs);
    socket.on('SERVER:NEW_MESSAGE', getDialogs);
    socket.on('SERVER:DIALOG_CHANGE_LAST_MESSAGE', getDialogs);
    socket.on('SERVER:MESSAGES_READED', updateDialogReadedStatus);
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', getDialogs);
      socket.removeListener('SERVER:NEW_MESSAGE', getDialogs);
      socket.removeListener('SERVER:DIALOG_CHANGE_LAST_MESSAGE', getDialogs);
      socket.removeListener('SERVER:MESSAGES_READED', updateDialogReadedStatus);
    };
  }, []);

  return (
    <div
      className={`dialog-sidebar ${currentDialog && 'dialog-sidebar--hide'}`}>
      <div className="dialog-sidebar__header">
        <span>{currentUser.username}</span>
        <div style={{ marginLeft: '20px' }}>
          <Button variant="transparent" onClick={openModal}>
            <Icon name="new-dialog" size="22px" />
          </Button>
        </div>
      </div>
      <div className="dialogs">
        {!dialogs.length ? (
          <DialogsLoader />
        ) : (
          dialogs.map((item) => {
            return (
              <DialogItem
                key={item._id}
                link={item._id}
                user={
                  item.partner._id === currentUser._id
                    ? item.author
                    : item.partner
                }
                currentDialog={currentDialog}
                lastMessage={item.lastMessage && item.lastMessage}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DialogSidebar;
