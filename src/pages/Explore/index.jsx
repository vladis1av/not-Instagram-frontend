import { useEffect, useState } from 'react';

import { ItemsLoader, PostMini } from '../../components';
import { postsApi } from '../../services/api';
import './Explore.scss';

const Explore = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postsApi
      .fetchPosts()
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Произошла ошибка при загрузке постов');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="explore">
      <div className="mini-posts-grid">
        {posts && posts.map((post) => <PostMini key={post._id} post={post} />)}
      </div>
      {isLoading && (
        <div className="explore__load-more">
          <ItemsLoader size="40" />
        </div>
      )}
    </div>
  );
};

export default Explore;
