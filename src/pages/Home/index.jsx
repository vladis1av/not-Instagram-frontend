import { useEffect, useState } from 'react';
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
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [suggestedUsersLoading, setSuggestedUsersLoading] = useState([true]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      posts.length <= totalCount
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
    if (fetching) {
      postsApi
        .fetchFeed(page)
        .then((res) => {
          setPosts([...posts, ...res.data]);
          setPage((prevState) => prevState + posts.length);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    userApi.getSuggestedUsers().then((res) => {
      setSuggestedUsersLoading(false);
      setSuggestedUsers(res);
    });
  }, []);

  return (
    <section className="feed">
      {!posts.length && !fetching ? (
        <SuggestionUsersItemWrapper users={suggestedUsers} />
      ) : (
        <>
          <div className="posts">
            {!posts.length && <PostsLoader className="post" />}
            {posts.length &&
              posts.map((item) => (
                <Post
                  key={item._id}
                  item={item}
                  currentUser={currentUser.id}
                  postId={item._id}
                />
              ))}
            {fetching && <ItemsLoader size="60px" />}
          </div>
          <div className="aside">
            <Suggestions
              userAvatar={currentUser.profileAvatar}
              username={currentUser.username}
              fullname={currentUser.fullname}
              currentUserId={currentUser._id}
              users={suggestedUsers}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
