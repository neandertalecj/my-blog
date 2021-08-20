export const START_CREATE_POST = 'START_CREATE_POST'
export const SUCCESS_CREATE_POST = 'SUCCESS_CREATE_POST'
export const SUCCESS_UPDATE_POST = 'SUCCESS_UPDATE_POST'
export const FAIL_CREATE_POST = 'FAIL_CREATE_POST'
export const FAIL_UPDATE_POST = 'FAIL_CREATE_POST'
export const SET_TITLE = 'SET_TITLE'
export const SET_EXCERPT = 'SET_EXCERPT'
export const SET_CONTENT = 'SET_CONTENT'
export const SET_IMG_URL = 'SET_IMG_URL'
export const SET_IMG_OBJECT_URL = 'SET_IMG_OBJECT_URL'
export const SET_IMG_FILE = 'SET_IMG_FILE'
export const SET_POST_ID = 'SET_POST_ID'
export const RESET_FORM = 'RESET_FORM'
export const START_UPDATE_POST = 'START_UPDATE_POST'

export const resetForm = () => ({ type: RESET_FORM })

export const updatePostAction = payload => ({
  type: START_UPDATE_POST,
  payload
})

export const setPostID = payload => ({
  type: SET_POST_ID,
  payload
})

export const setTitle = payload => ({
  type: SET_TITLE,
  payload
})

export const setExcerpt = payload => ({
  type: SET_EXCERPT,
  payload
})

export const setContent = payload => ({
  type: SET_CONTENT,
  payload
})

export const setImgObgectURL = payload => ({
  type: SET_IMG_OBJECT_URL,
  payload  
})

export const setImgFile = payload => ({
  type: SET_IMG_FILE,
  payload  
})

export const setImgUrl = payload => ({
  type: SET_IMG_URL,
  payload
})

export const startCreatePost = payload => ({
  type: START_CREATE_POST,
  payload,
})

export const succesCreatePost = payload => ({
  type: SUCCESS_CREATE_POST,
  payload,
})

export const succesUpdatePost = payload => ({
  type: SUCCESS_UPDATE_POST,
  payload,
})

export const failCreatePost = payload => ({
  type: FAIL_CREATE_POST,
  payload,
})

export const failUpdatePost = payload => ({
  type: FAIL_UPDATE_POST,
  payload,
})