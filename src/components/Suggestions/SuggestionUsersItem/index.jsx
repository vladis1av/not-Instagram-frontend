import { useState } from 'react';
import { Link } from 'react-router-dom';

import { userApi } from '../../../services/api';
import { Image, Button } from '../../';
import { useSelector } from 'react-redux';
import './SuggestionUsersItem.scss';

const SuggestionUsersItem = ({ srcImage, username, fullname, userId }) => {
  const [isFollow, setIsFollow] = useState(false);
  const { currentUser } = useSelector(({ user }) => user);

  const followHandler = () => {
    userApi
      .toggleFollow(userId, currentUser._id)
      .then((res) => setIsFollow(!isFollow))
      .catch(() => setIsFollow(false));
  };

  return (
    <div className="suggestion-users__item">
      <div className="suggestion-users__item__avatar">
        <Link to={`/user/${username}`}>
          <Image
            src={srcImage}
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
