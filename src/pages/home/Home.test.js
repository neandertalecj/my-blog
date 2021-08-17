import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../utils/tests/renderWithRouter'
import Home from './Home'

describe('Home', () => {
  it('renders page', () => {
    renderWithRouter(<Home />)
    // screen.debug()
    // expect(screen.getByText(/home/i)).toBeInTheDocument()
  })
})