import {
  GET_POST,
  SET_POST,
  FAIL_POST,

} from './post.actions'

const initialState = {
  isLoading: false,
  post: null,
  error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST:
      return {
        ...state,
        isLoading: true,
      }
    case SET_POST:
      return {
        ...state,
        post: payload,
        error: null,
        isLoading: false,
      }
    case FAIL_POST:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
      return state
  }
}
