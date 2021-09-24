import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Image, Button, Icon, PostMini } from '../../components';
import { useChangeDocumentTitle } from '../../hooks';
import {
  setFollow,
  setLoaded,
  setProfile,
} from '../../redux/reducers/profile/profileAction';
import profileReducer, {
  initialState,
} from '../../redux/reducers/profile/profileReducer';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import { userApi } from '../../services/api/';
import './Profile.scss';

const Profile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  const toggleFollow = async () => {
    try {
      setIsLoadingFollow(true);
      const res = await userApi.toggleFollow(state.user._id, currentUser._id);
      dispatch(setFollow(res.operation));
    } catch (error) {
      console.log(error);
      alert(
        `Произошла ошибка при ${state.isFollowing ? 'Подписке' : 'Отписке'}`,
      );
    } finally {
      setIsLoadingFollow(false);
    }
  };

  useChangeDocumentTitle(
    state.user &&
      `${state.user.fullname} (@${state.user.username}) • Фото в not-Instagram`,
  );

  useEffect(() => {
    (async function () {
      try {
        dispatch(setLoaded(false));
        const userProfile = await userApi.fetchUser(id);
        dispatch(setProfile(userProfile));
      } catch (error) {
        dispatch(setLoaded(false));
        console.log(error);
      }
    })();
  }, [id]);

  if (!state.isLoaded) {
    return null;
  }

  return (
    <div className="profile">
      <header className="profile__header-wrapper">
        <div className="profile__photo-wrapper">
          <Button variant="transparent">
            <div>
              <Image
                circle
                src={state.user.profileAvatar}
                alt="user profile photo"
              />
            </div>
          </Button>
        </div>
        <div className="profile__content">
          <div className="profile__content__title">
            <div className="profile__content__title__username">
              <h2>{state.user.username}</h2>
            </div>
            <div className="profile__content__title__edit">
              {id === currentUser.username ? (
                <Button
                  variant="edit"
                  size="small"
                  to="/settings/edit"
                  className="profile__content__edit__link">
                  <span>Редактировать профиль</span>
                  <div className="profile__content__edit__setings-icon">
                    <Icon name="settings" size="24" />
                  </div>
                </Button>
              ) : (
                <Button
                  isLoading={isLoadingFollow}
                  disabled={isLoadingFollow}
                  variant={!state.isFollowing ? 'primary' : 'edit'}
                  size="small"
                  onClick={toggleFollow}>
                  <span>
                    {!state.isFollowing ? 'Подписаться' : 'Отписаться'}
                  </span>
                </Button>
              )}
            </div>
            <div className="settings"></div>
          </div>
          <div className="counter">
            <div className="counter__item">
              <span>{state.posts.postCount}</span> публикаций
            </div>
            <div className="counter__item">
              <span>{state.followers}</span> подписчиков
            </div>
            <div className="counter__item">
              <span>{state.following}</span> подписок
            </div>
          </div>
          <div className="biography__content">
            <div className="display-name">
              <h2>{state.user.fullname}</h2>
            </div>
            <div className="biography">
              <span>{state.user.bio && state.user.bio}</span>
            </div>
          </div>
        </div>
      </header>
      <ul className="profile__stats-list">
        <li className="profile__stats-list__item">
          <div className="profile__stats-list__item__counter">
            {state.posts.postCount}
          </div>
          <span>публикаций</span>
        </li>
        <li className="profile__stats-list__item">
          <div className="profile__stats-list__item__counter">
            {state.followers}
          </div>
          <span>подписчиков</span>
        </li>
        <li className="profile__stats-list__item">
          <div className="profile__stats-list__item__counter">
            {state.following}
          </div>
          <span>подписок</span>
        </li>
      </ul>
      <div className="profile__tabs">
        <div className="profile__tabs__item profile__tabs__item--active">
          <Icon name="posts" size="20" />
          <span>Публикации</span>
        </div>
        <div className="profile__tabs__item">
          <Icon name="saved" size="20" />
          <span>Сохраненное</span>
        </div>
      </div>
      <div className="profile__posts">
        {state.posts.data.length ? (
          <div className="mini-posts-grid">
            {state.posts.data.map((post) => (
              <PostMini key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="profile__posts__empty">
            <div className="profile__posts__empty__item">
              <span>
                <Icon name="camera" size="28" />
              </span>
            </div>
            <h1>Публикаций пока нет</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
