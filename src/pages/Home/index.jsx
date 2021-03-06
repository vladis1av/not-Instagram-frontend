import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { postsApi, userApi } from '../../services/api/';
import { PostsLoader, Post, ItemsLoader, Suggestions } from '../../components';
import { useChangeDocumentTitle } from '../../hooks';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import { useObserver } from '../../hooks/useObserver';
import SuggestionUsersItemWrapper from '../../components/Suggestions/SuggestionUsersItemWrapper';
import './Home.scss';

const Home = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [feedIsEnd, setFeedIsEnd] = useState(false);
  const [countToSkipPosts, setCountToSkipPosts] = useState(0);
  const lastElemRef = useRef(null);

  const fetchSuggestedUsers = async () => {
    try {
      const res = await userApi.getSuggestedUsers();
      setSuggestedUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useObserver(lastElemRef, !feedIsEnd, fetching, () => setFetching(true));
  useChangeDocumentTitle('not-Instagram');

  useEffect(() => {
    if (fetching && !feedIsEnd) {
      postsApi
        .fetchFeed(countToSkipPosts)
        .then(({ data }) => {
          if (!data.length) {
            setFeedIsEnd(true);
          }
          setPosts([...posts, ...data]);
          setCountToSkipPosts((prevState) => prevState + data.length);
        })
        .catch((error) => console.log(error))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <section className="feed">
      {!posts.length && !fetching ? (
        <SuggestionUsersItemWrapper users={suggestedUsers} />
      ) : (
        <React.Fragment>
          <div className="posts">
            {!posts.length ? (
              <PostsLoader className="post" />
            ) : (
              posts.map((item) => (
                <Post
                  key={item._id}
                  item={item}
                  postId={item._id}
                  currentUserId={currentUser._id}
                />
              ))
            )}
            {posts.length > 0 && fetching && !feedIsEnd && (
              <ItemsLoader size="35px" />
            )}
            {feedIsEnd && <div>?????????? ??????????????????????</div>}
            <div ref={lastElemRef} style={{ padding: '10px' }}></div>
          </div>
          <div className="aside">
            <Suggestions
              userAvatar={currentUser.profileAvatar}
              username={currentUser.username}
              fullname={currentUser.fullname}
              users={suggestedUsers}
            />
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default Home;
