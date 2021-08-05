export const GET_POST = 'GET_POST'
export const SET_POST = 'SET_POST'
export const FAIL_POST = 'FAIL_POST'

export const getPost = payload => ({
  type: GET_POST,
  payload,
})

export const setPost = payload => ({
  type: SET_POST,
  payload,
})

export const failPost = payload => ({
  type: FAIL_POST,
  payload
})