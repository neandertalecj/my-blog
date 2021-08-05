import { all, call, put, take } from 'redux-saga/effects'
import { GET_POSTS, setPosts, failPosts } from './blog.actions'
import { fetchPosts } from '../../utils/api'

function* getPostsWorker() {
  try {
    const data = yield call(fetchPosts)
    yield put(setPosts(data))
  } catch (error) {
    yield put(failPosts(error.message))
  }
}

function* getPostsFlow() {
  while (true) {
    yield take(GET_POSTS)

    yield call(getPostsWorker)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([getPostsFlow()]);
}