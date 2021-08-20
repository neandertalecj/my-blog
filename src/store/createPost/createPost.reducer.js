import { EditorState } from 'draft-js'
import {
  START_CREATE_POST,
  START_UPDATE_POST,
  SUCCESS_CREATE_POST,
  SUCCESS_UPDATE_POST,
  FAIL_CREATE_POST,
  FAIL_UPDATE_POST,
  SET_TITLE,
  SET_EXCERPT,
  SET_CONTENT,
  SET_IMG_URL,
  SET_IMG_FILE,
  SET_IMG_OBJECT_URL,
  SET_POST_ID,
  RESET_FORM,
} from './createPost.actions'

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
  lastUpdate: null,
  error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_FORM:
      return initialState
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
    case START_UPDATE_POST:
    case START_CREATE_POST:
      return {
        ...state,
        isLoading: true,
      }
    case SUCCESS_UPDATE_POST:
      return {
        ...state,
        post: { ...state.post, imgUrl: payload },
        error: null,
        isLoading: false,
        objectUrl: null,
        file: null,
        published: 'updated',
      }
    case SUCCESS_CREATE_POST:
      return {
        ...state,
        post: { ...state.post, imgUrl: payload },
        error: null,
        isLoading: false,
        objectUrl: null,
        file: null,
        published: 'published',
      }
    case FAIL_UPDATE_POST:
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