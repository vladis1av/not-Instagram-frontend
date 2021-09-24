import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { postsApi, userApi } from '../../services/api/';
import { PostsLoader, Post, ItemsLoader, Suggestions } from '../../components';
import { useChangeDocumentTitle } from '../../hooks';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import SuggestionUsersItemWrapper from '../../components/Suggestions/SuggestionUsersItemWrapper';
import './Home.scss';

const Home = () => {
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [feedIsEnd, setFeedIsEnd] = useState(false);
  const [countToSkipPosts, secCountToSkipPosts] = useState(0);

  const fetchSuggestedUsers = () => {
    try {
      userApi.getSuggestedUsers().then((res) => {
        setSuggestedUsers(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      !feedIsEnd
    ) {
      setFetching(true);
    }
  };

  useChangeDocumentTitle('not-Instagram');

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetching && !feedIsEnd) {
      postsApi
        .fetchFeed(countToSkipPosts)
        .then((res) => {
          if (!res.data.length) {
            setFeedIsEnd(true);
          }
          setPosts([...posts, ...res.data]);
          secCountToSkipPosts((prevState) => prevState + res.data.length);
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
            {!posts.length && <PostsLoader className="post" />}
            {posts.length
              ? posts.map((item) => (
                  <Post
                    key={item._id}
                    item={item}
                    currentUserId={currentUser.id}
                    postId={item._id}
                  />
                ))
              : null}
            {posts.length > 0 && fetching && !feedIsEnd && (
              <ItemsLoader size="35px" />
            )}
            {feedIsEnd && <div>Лента закончилась</div>}
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
