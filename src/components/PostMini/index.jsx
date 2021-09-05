import { Image, Icon } from '../';
import { getArrayLength } from '../../utils';
import './PostMini.scss';

const PostMini = ({ post }) => {
  return (
    <div className="post-card__list">
      <div className="post-card__item">
        <a href="">
          <Image src={post.images[0]} alt="post preview" />
          <div className="post-card__item__info">
            <ul>
              <li>
                <span>
                  <Icon name="heart-active" size="20" />
                </span>
                <span>{post.postLikes}</span>
              </li>
              <li>
                <span>
                  <Icon
                    name="comment-active"
                    size="22"
                    className="comment-active-svg"
                  />
                </span>
                <span>{post.comments}</span>
              </li>
            </ul>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PostMini;
