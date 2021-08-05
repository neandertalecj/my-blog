import {
  APP_INITIALIZATION,
} from './app.actions'

const initialState = {
  initApp: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_INITIALIZATION:
      return {
        ...state,
        initApp: true,
      }

    default:
      return state
  }
}
