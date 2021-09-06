import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { Image, Icon, Button, Textarea } from '..';
import { setPost } from '../../redux/reducers/post/postAction';
import postReducer, {
  initialState,
} from '../../redux/reducers/post/postReducer';
import { postTypes } from '../../redux/reducers/post/postTypes';
import { postsApi } from '../../services/api';
import { formatDate } from '../../utils/';
import './Post.scss';

const PostBlock = ({ currentUser, postId, item }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const toggleLike = async () => {
    dispatch({ type: postTypes.TOGGLE_LIKE });
    try {
      await postsApi.toggleLike(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddComment = async (message) => {
    try {
      const res = await postsApi.createComment(postId, message);
      dispatch({ type: postTypes.ADD_COMMENT, payload: res.data });
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(setPost({ item, currentUser }));
  }, []);

  if (!state.isLoaded) {
    return null;
  }

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__header__user-image">
          <Image
            src={state.data.author.profileAvatar}
            circle
            width="32"
            height="32"
            alt="user profile photo"
          />
        </div>
        <div className="post__header__username">
          <Link to={`/user/${state.data.author.username}`}>
            <span>{state.data.author.username}</span>
          </Link>
        </div>
        <div className="post__header__header-more">
          <Icon name="more" size="18" />
        </div>
      </header>
      <div className="post__image">
        <Image
          src={state.data.images[0]}
          alt={`${state.data.author.username} post image`}
          width="614px"
        />
      </div>
      <div className="post__content">
        <div className="post__content__actions">
          <div>
            <Button onClick={toggleLike} variant="transparent">
              {!state.isLiked ? (
                <Icon name="heart" size="24"></Icon>
              ) : (
                <Icon
                  name="heart-active"
                  size="24"
                  className="post__content__actions__heart--active"></Icon>
              )}
            </Button>
          </div>
          <div>
            <Icon name="comment" size="24" />
          </div>
          <div>
            <Icon name="direct" size="24" />
          </div>
          <div>
            <Icon name="saved" size="24" />
          </div>
        </div>
        {state.likesCount > 0 && (
          <div className="post__content__recent-liked">
            <span>{state.likesCount} отметок "Нравиться"</span>
          </div>
        )}
        {state.data.text && (
          <div className="post__content__description">
            <span>{state.data.author.username}</span>&nbsp;
            <span>{state.data.text}</span>
          </div>
        )}
        {state.data.commentCount > 0 && (
          <div className="post__content__comments">
            <span className="post__content__comments__more-count">
              Посмотреть все комментарии ({state.data.commentCount})
            </span>
            {state.data.comments.length
              ? state.data.comments.map((item) => (
                  <div className="post__content__comments__item">
                    <span>{item.author.username}</span>&nbsp;
                    <span>{item.message}</span>
                  </div>
                ))
              : null}
          </div>
        )}

        <div className="post__content__date">
          <span>{formatDate(new Date(state.data.createdAt))}</span>
        </div>
        <div className="post-comment-Input ">
          <Textarea post api={onAddComment} />
        </div>
      </div>
    </article>
  );
};

export default PostBlock;
