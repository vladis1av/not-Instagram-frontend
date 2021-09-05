import { Image } from '../';
import SuggestionUsersItem from './SuggestionUsersItem/';
import './Suggestions.scss';
import { Link } from 'react-router-dom';

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
      <div className="suggestions__users">
        <div className="suggestions__users__header">
          <span>Рекомендации для вас</span>
          <span></span>
        </div>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <SuggestionUsersItem
                key={user._id}
                srcImage={user.profileAvatar}
                username={user.username}
                fullname={user.fullname}
                userId={user._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Suggestions;
