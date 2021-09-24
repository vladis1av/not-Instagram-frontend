import { useState } from 'react';
import { Link } from 'react-router-dom';

import { userApi } from '../../../services/api';
import { Image, Button } from '../../';
import './SuggestionUsersItem.scss';

const SuggestionUsersItem = ({ username, profileAvatar, fullname, userId }) => {
  const [isFollow, setIsFollow] = useState(false);

  const followHandler = () => {
    userApi
      .toggleFollow(userId)
      .then(() => setIsFollow(!isFollow))
      .catch((error) => {
        setIsFollow(false);
        alert(`Произошла ошибка при ${isFollow ? 'Отписке' : 'Подписке'}`);
        console.log(error);
      });
  };

  return (
    <div className="suggestion-users__item">
      <div className="suggestion-users__item__avatar">
        <Link to={`/user/${username}`}>
          <Image
            src={profileAvatar}
            alt="user profile photo"
            circle
            height="32"
            width="32"
          />
        </Link>
      </div>
      <div className="suggestion-users__item__info">
        <Link to={`/user/${username}`}>
          <span className="suggestion-users__item__info__username">
            {username}
          </span>
        </Link>
        <span className="suggestion-users__item__info__fullname">
          {fullname}
        </span>
      </div>
      <Button
        variant={isFollow ? 'edit' : 'primary'}
        size="small"
        onClick={followHandler}>
        {isFollow ? 'Отписаться' : 'Подписаться'}
      </Button>
    </div>
  );
};

export default SuggestionUsersItem;
