import { profileTypes } from './profileTypes';

export const initialState = {
  user: null,
  posts: null,
  followers: null,
  following: null,
  isFollowing: null,
  isLoaded: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileTypes.SET_PROFILE:
      return {
        ...state,
        posts: {
          data: action.payload.posts ? action.payload.posts.data : [],
          postCount: action.payload.posts ? action.payload.posts.postCount : 0,
        },
        ...action.payload,
        isLoaded: true,
      };

    case profileTypes.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    case profileTypes.SET_FOLLOW: {
      if (action.payload === 'follow') {
        return {
          ...state,
          isFollowing: true,
          followers: state.followers + 1,
        };
      }
      return {
        ...state,
        isFollowing: false,
        followers: state.followers - 1,
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
