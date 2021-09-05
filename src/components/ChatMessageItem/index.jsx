import { useRef, useState } from 'react';

import { Image, Icon } from '../';
import { useOutside } from '../../hooks';
import { messageApi } from '../../services/api';
import './ChatMessageItem.scss';

const ChatMessageItem = ({ isMe, message }) => {
  const [messageRemoveIsOpen, setMessageRemoveIsOpen] = useState(false);
  const messageRemoveRef = useRef(null);

  useOutside(messageRemoveRef, () => setMessageRemoveIsOpen(false));

  const removeMessage = (id) => {
    messageApi.removeById(id).then(() => setMessageRemoveIsOpen(false));
  };

  return (
    <>
      {message.text && (
        <div className={`messages__item ${isMe ? 'messages__item--me' : ''}`}>
          {!isMe && (
            <Image
              className="messages__item__user-avatar"
              src={message.user.profileAvatar}
              alt="user profile photo"
              width="24"
              height="24"
              circle
            />
          )}
          <div className="chat__message">
            <span>{message.text}</span>
          </div>
          {isMe && (
            <div
              className="chat__message__btn"
              onClick={() => setMessageRemoveIsOpen(true)}>
              {messageRemoveIsOpen && (
                <div
                  ref={messageRemoveRef}
                  className="chat__message__remove"
                  onClick={() => removeMessage(message._id)}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '25px',
                      right: '15px',
                    }}>
                    <div className="chat__message__remove__arrow"></div>
                  </div>
                  <span>Отменить отправку</span>
                </div>
              )}
              <div
                className={`chat__message__btn__icon-touch ${
                  messageRemoveIsOpen &&
                  'chat__message__btn__icon-touch--active'
                }`}>
                <Icon name="more" size="22px" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatMessageItem;
