import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon, Image } from '../';
import './ChatStatus.scss';

const ChatStatus = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const { dialogs, currentDialog } = useSelector(({ dialogs }) => dialogs);

  if (!dialogs.length || !currentDialog) {
    return null;
  }

  let partnerToSendMessage = {};

  const filteredDialod = dialogs.filter(
    (item) => item._id === currentDialog,
  )[0];

  if (filteredDialod.author._id === currentUser._id) {
    partnerToSendMessage = filteredDialod.partner;
  } else {
    partnerToSendMessage = filteredDialod.author;
  }

  if (!dialogs) {
    return null;
  }

  return (
    <div className="chat-status">
      <Link to="/direct" className="chat-status__link-back">
        <Icon name="arrow" size="20" />
      </Link>
      <Link to={`/user/${partnerToSendMessage.username}`}>
        <div className="chat-status__user">
          <div className="chat-status__user__avatar">
            <Image
              circle
              src={partnerToSendMessage.profileAvatar}
              alt="user profile photo"
              width="24"
              height="24"
            />
            {partnerToSendMessage.isOnline && (
              <div className="user-is-online"></div>
            )}
          </div>
          <div className="chat-status__user__username">
            <span>{partnerToSendMessage.username}</span>
          </div>
        </div>
      </Link>

      <Icon name="info" size="24px" />
    </div>
  );
};

export default ChatStatus;
