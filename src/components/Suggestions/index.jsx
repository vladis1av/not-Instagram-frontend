import { Link } from 'react-router-dom';

import { Image } from '../';
import SuggestionUsersItem from './SuggestionUsersItem/';
import './Suggestions.scss';
import SuggestionsLoader from '../SuggestionsLoader';

const Suggestions = ({ userAvatar, username, fullname, users }) => {
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
      <SuggestionUsersItem users={users} />
    </div>
  );
};

export default Suggestions;
