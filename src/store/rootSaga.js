import { all } from 'redux-saga/effects'
import authSaga from './auth/auth.saga'
import initial from './app/initialSagas'
import pageLoader from './app/pageLoaderSaga'
import posts from './blog/blog.saga'
import post from './post/post.saga'
import createPost from './createPost/createPost.saga'

export default function* rootSaga() {
  yield all([
    initial(),
    authSaga(),
    posts(),
    post(),
    createPost,
    // pageLoader()
  ])
}
