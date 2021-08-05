import {
  GET_POSTS,
  SET_POSTS,
  FAIL_POSTS,
} from './blog.actions'

const initialState = {
  isLoading: false,
  posts: null,
  error: null,
  post: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: true,
      }
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
        error: null,
        isLoading: false,
      }
    case FAIL_POSTS:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
      return state
  }
}
