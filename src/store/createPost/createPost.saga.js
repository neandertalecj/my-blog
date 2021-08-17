import { all, call, put, take } from 'redux-saga/effects'
import { START_CREATE_POST, succesCreatePost, failCreatePost } from './createPost.actions'
import { publishPost } from '../../utils/api'

function* createPostWorker(payload) {
  try {
    const data = yield call(publishPost, payload)
    yield put(succesCreatePost(data))
  } catch (error) {
    yield put(failCreatePost(error.message))
  }
}

function* createPostFlow() {
  while (true) {
    const { payload } = yield take(START_CREATE_POST)

    yield call(createPostWorker, payload)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([createPostFlow()]);
}