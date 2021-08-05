import { all, call, put, take } from 'redux-saga/effects'
import { eventChannel } from "redux-saga"
import firebase from 'firebase/app'
import 'firebase/auth'
import { logoutSuccess, authSuccess, LOGOUT_START } from '../../auth/auth.actions'
import { logout } from '../../auth/auth.saga'
import { initDone } from '../app.actions'

// const auth = firebase.auth()

// https://stackoverflow.com/questions/51672715/redux-saga-firebase-onauthstatechanged-eventchannel
const authStateChannel = function () {
  return eventChannel((emit) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (doc) => emit({ doc }),
      (error) => emit({ error })
    )

    return unsubscribe;
  })
}

export const onAuthStateChanged = function* () {
  const channel = yield call(authStateChannel);

  while (true) {
    const { doc, error } = yield take(channel);
    if (error) {
      // handle error
      console.log('Error', error)
    } else {
      if (doc) {
        // user has signed in, use `doc.toJSON()` to check
        yield put(authSuccess(doc))
        yield put(initDone())

        yield take(LOGOUT_START) // start watching
        yield call(logout)
      } else {
        // user has signed out
        yield put(logoutSuccess())
        yield put(initDone())
      }
    }
  }
}

export default function* loadBasicData() {
  yield all([
    call(onAuthStateChanged)
  ])
}