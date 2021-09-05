import { useEffect, useState } from 'react';

import { PostMini } from '../../components';
import { postsApi } from '../../services/api';
import './Explore.scss';

const Explore = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    postsApi.fetchPosts().then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  return (
    <div className="explore">
      <div className="mini-posts-grid">
        {posts && posts.map((post) => <PostMini key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Explore;
