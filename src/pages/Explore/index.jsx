import { useEffect, useState } from 'react';

import { ItemsLoader, PostMini } from '../../components';
import { postsApi } from '../../services/api';
import './Explore.scss';

const Explore = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postsApi.fetchPosts().then((res) => {
      setIsLoading(false);
      setPosts(res.data.data);
    });
  }, []);

  return (
    <div className="explore">
      <div className="mini-posts-grid">
        {posts && posts.map((post) => <PostMini key={post._id} post={post} />)}
      </div>
      {isLoading && <ItemsLoader size="80" />}
    </div>
  );
};

export default Explore;
