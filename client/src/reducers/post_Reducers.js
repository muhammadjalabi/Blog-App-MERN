import {
  RESET_POST, CREATE_POST, GET_ALL_POSTS, GET_POST, UPDATE_POST, DELETE_POST, TOGGLE_POSTS_LOADING, TOGGLE_POST_LOADING
} from '../actions/types'

const initState = {
  post: {},
  postLoading: false,
  posts: [],
  postsLoading: false
}

export default function(state = initState, action) {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case GET_ALL_POSTS:
      return { ...state, post: {}, posts: [...action.payload] };
    case GET_POST:
      return { ...state, post: { ...action.payload[0] } };
    case UPDATE_POST:
      const posts = state.posts.filter(post => post._id !== action.payload._id)
      return { ...state, post: {}, posts: [...posts, action.payload] };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload) };
    case TOGGLE_POST_LOADING:
      return { ...state, postLoading: !state.postLoading };
    case TOGGLE_POSTS_LOADING:
      return { ...state, postsLoading: !state.postsLoading };
    case RESET_POST:
      return initState;
    default:
      return state;
  }
}