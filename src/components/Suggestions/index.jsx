import { Link } from 'react-router-dom';

import { Image } from '../';
import SuggestionUsersItemWrapper from './SuggestionUsersItemWrapper';
import './Suggestions.scss';

const Suggestions = ({
  userAvatar,
  username,
  fullname,
  users,
  currentUserId,
}) => {
  return (
    <div className="suggestions">
      <div className="user-switch">
        <div className="user-switch__avatar">
          <Link to={`/user/${username}`}>
            <Image
              src={userAvatar}
              alt="user profile photo"
              circle
              height="56"
              width="56"
            />
          </Link>
        </div>
        <div className="user-switch__name">
          <Link to={`/user/${username}`}>
            <span>{username}</span>
          </Link>
          <span>{fullname}</span>
        </div>
      </div>
      <SuggestionUsersItemWrapper users={users} currentUserId={currentUserId} />
    </div>
  );
};

export default Suggestions;
