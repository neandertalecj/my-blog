export const GET_POSTS = 'GET_POSTS'
export const SET_POSTS = 'SET_POSTS'
export const FAIL_POSTS = 'FAIL_POSTS'

export const getPosts = () => ({
  type: GET_POSTS
})

export const setPosts = payload => ({
  type: SET_POSTS,
  payload,
})

export const failPosts = payload => ({
  type: FAIL_POSTS,
  payload
})