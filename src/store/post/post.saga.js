import { all, call, put, take } from 'redux-saga/effects'
import { GET_POST, setPost, failPost } from './post.actions'
import { fetchPost } from '../../utils/api'

function* getPostWorker(payload) {
  try {
    const data = yield call(fetchPost, payload)
    yield put(setPost(data))
  } catch (error) {
    yield put(failPost(error.message))
  }
}

function* getPostFlow() {
  while (true) {
    const { payload } = yield take(GET_POST)

    yield call(getPostWorker, payload)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([getPostFlow()]);
}