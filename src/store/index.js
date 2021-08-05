import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import saga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  withDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(saga)

export default store
