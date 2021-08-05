import { fireEvent, screen } from '@testing-library/react'
import { renderWithRouter } from './utils/tests/renderWithRouter'
import App from './App'
import React from "react"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"

// export const renderWithRouter = (
//   component,
//   {
//     route = "/",
//     history = createMemoryHistory({ initialEntries: [route] }),
//   } = {}
// ) => {
//   const Wrapper = ({ children }) => (
//     <Router history={history}>{children}</Router>
//   );
//   return {
//     ...render(component, { wrapper: Wrapper }),
//     history,
//   }
// }

describe('React Router', () => {
  it('should render the home page', () => {
    renderWithRouter(<App />)
    // screen.debug()
    // screen.getByTestId('navbar')
  })

  // it('should navigate to blog page', () => {
  //   // const route = '/blog'
  //   renderWithRouter(<App />)
  //   // fireEvent.click(screen.getByTestId('blog-link'))
  //   fireEvent.click(screen.getByText(/Blog/))
  //   // screen.getByText(/blog/)
  //   screen.debug()

  //   // screen.getByText(/React Architecture/i)
  // })

  // it('should navigate to error page', () => {
  //   // const route = '/wrong-route'
  //   renderWithRouter(<App />, { route: '/wrong-route' })
  //   screen.debug()


  // })
})
