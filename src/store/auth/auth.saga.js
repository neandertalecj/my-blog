import { all, call, put, take } from 'redux-saga/effects'
import { authFail, authSuccess, AUTH_START, logoutFail, logoutSuccess, LOGOUT_START } from './auth.actions'
import { registerUser, loginUser, logoutUser } from '../../utils/api'

// Worker 1
function* authenticate({ email, password, isRegister, firsName = '', secondName = '', userName = '' }) {
  console.log('isRegister API', isRegister)
  try {
    let data
    if (isRegister) {
      data = yield call(registerUser, { email, password, firsName, secondName, userName })
    } else {
      data = yield call(loginUser, { email, password })
    }

    yield put(authSuccess(data.user))

    return data.user.uid   //userid
  } catch (error) {
    yield put(authFail(error.message))
  }
}

// Worker 2
export function* logout() {
  try {
    yield call(logoutUser)
    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutFail(error.message))
  }
}
// Watcher
function* authFlow() {
  while (true) {
    const { payload } = yield take(AUTH_START)

    const uid = yield call(authenticate, payload) //userid

    if (uid) {
      yield take(LOGOUT_START) // start watching
      yield call(logout)
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([authFlow()]);
}
