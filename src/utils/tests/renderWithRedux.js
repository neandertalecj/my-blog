import { createStore } from "redux"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"

import { reducer } from "./reducer";

export const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}