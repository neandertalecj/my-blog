import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import app from './app/app.reducer'
import auth from './auth/auth.reducer'
import posts from './blog/blog.reducer'
import post from './post/post.reducer'
import createPost from './createPost/createPost.reducer'


export const history = createBrowserHistory()

export default combineReducers({
  app,
  auth,
  posts,
  post,
  createPost,
  router: connectRouter(history),
})
