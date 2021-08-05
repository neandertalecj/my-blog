import React from "react"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"

export const renderWithRouter = (
  component,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  }
}