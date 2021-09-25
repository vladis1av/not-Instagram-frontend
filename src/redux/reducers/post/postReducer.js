import { postTypes } from './postTypes';

export const initialState = {
  messageValue: '',
  isLoaded: false,
  isLiked: null,
  data: {
    _id: null,
    images: null,
    author: null,
    createdAt: null,
    postLikes: [],
    comments: [],
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.SET_MESSAGE_VALUE:
      return {
        ...state,
        messageValue: action.payload,
      };
    case postTypes.SET_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };

    case postTypes.SET_POST: {
      const data = action.payload.item;
      const { comments = [], commentCount = 0 } = data.commentData || {};

      const isLiked = !!data.postLikes.find((like) => {
        return like.author === action.payload.currentUserId;
      });

      return {
        ...state,
        isLoaded: true,
        isLiked,
        likesCount: data.postLikes.length,
        data: {
          comments,
          commentCount,
          ...data,
        },
      };
    }

    case postTypes.TOGGLE_LIKE:
      return {
        ...state,
        isLiked: state.isLiked ? false : true,
        likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
      };

    case postTypes.ADD_COMMENT: {
      return {
        ...state,
        data: {
          ...state.data,
          commentCount: state.data.commentCount + 1,
          comments: [...state.data.commentData.comments, action.payload],
        },
      };
    }

    default:
      return state;
  }
};

export default postReducer;
