import {
  START_CREATE_POST,
  SUCCESS_CREATE_POST,
  FAIL_CREATE_POST,
  SET_TITLE,
  SET_EXCERPT,
  SET_CONTENT,
  SET_IMG_URL,
  SET_IMG_FILE,
  SET_IMG_OBJECT_URL,
  SET_POST_ID,
} from './createPost.actions'

import { EditorState } from 'draft-js'

const initialState = {
  isLoading: false,
  post: {
    title: '',
    content: EditorState.createEmpty(),
    excerpt: '',
    imgUrl: '',
  },
  file: null,
  objectUrl: null,
  published: false,
  postID: null,
  error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POST_ID:
      return {
        ...state,
        postID: payload,
      }
    case SET_IMG_FILE:
      return {
        ...state,
        file: payload
      }
    case SET_IMG_OBJECT_URL:
      return {
        ...state,
        objectUrl: payload
      }
    case SET_TITLE:
      return {
        ...state,
        post: { ...state.post, title: payload }
      }
    case SET_EXCERPT:
      return {
        ...state,
        post: { ...state.post, excerpt: payload }
      }
    case SET_CONTENT:
      return {
        ...state,
        post: { ...state.post, content: payload }
      }
    case SET_IMG_URL:
      return {
        ...state,
        post: { ...state.post, imgUrl: payload }
      }
    case START_CREATE_POST:
      return {
        ...state,
        isLoading: true,
      }
    case SUCCESS_CREATE_POST:
      return {
        ...state,
        post: payload,
        error: null,
        isLoading: false,
        objectUrl: null,
        file: null,
      }
    case FAIL_CREATE_POST:
      return {
        ...state,
        error: payload,
        isLoading: false,
      }
    default:
      return state
  }
}