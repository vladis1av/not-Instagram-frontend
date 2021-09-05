import { NavLink } from 'react-router-dom';
import { formatDate } from '../../utils';

import { Image } from '../';
import './DialogItem.scss';

const DialogItem = ({ link, user, lastMessage, currentDialog }) => {
  return (
    <NavLink
      to={`/direct/${link}`}
      className="dialogs__item"
      activeClassName="dialogs__item--active"
      style={{ textDecoration: 'none' }}>
      <div className="dialogs__item__avatar">
        {user.isOnline && <div className="user-is-online"></div>}
        <Image
          circle
          src={user.profileAvatar}
          alt="user profile photo"
          width="56"
          height="56px"
        />
      </div>
      <div className="dialogs__item__info">
        <span className="dialogs__item__info__username">{user.username}</span>
        {lastMessage && (
          <>
            <div className="dialogs__item__info__last-message">
              <span>{lastMessage.text}</span>
              <div className="dialogs__item__info__last-message__time">
                {formatDate(new Date(lastMessage.createdAt))}
              </div>
            </div>
            {!currentDialog &&
              !lastMessage.read &&
              user._id === lastMessage.user._id && (
                <div className="last-message-unread"></div>
              )}
          </>
        )}
      </div>
    </NavLink>
  );
};

export default DialogItem;
