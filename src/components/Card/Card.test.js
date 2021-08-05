import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../utils/tests/renderWithRouter'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { CardPage } from './Card'

const posts = [
  {
    title: 'Article title',
    id: '1dfg3',
    imgUrl: 'http://url.com',
    alt: 'Image',
    shortText: 'Ipson Lorem',
  },
]

describe('Card', () => {
  it('renders by default', () => {
    renderWithRouter(<CardPage />)

    expect(screen.queryByText(/View Details/i)).toBeNull()
  })

  it('renders with posts', () => {
    renderWithRouter(<CardPage posts={posts} />)

    expect(screen.getByText(/Article title/i)).toBeInTheDocument()
    expect(screen.getByText(/Ipson Lorem/i)).toBeInTheDocument()
    expect(screen.getByText(/View Details/i)).toBeInTheDocument()

    const img = screen.getByAltText(/Image/i)
    expect(img).toHaveAttribute('src', posts[0].imgUrl)
    expect(img).toBeInTheDocument()
  })

  it('routes to a new route', () => {              // https://stackoverflow.com/questions/61869886/simplest-test-for-react-routers-link-with-testing-library-react
    const history = createMemoryHistory()

    history.push = jest.fn()

    render(
      <Router history={history}>
        <CardPage posts={posts} />
      </Router>
    )

    const link = screen.getByText(/View Details/i)
    const expectURL = `/blog/${posts[0].title}`

    userEvent.click(link)

    expect(history.push).toHaveBeenCalledWith(expectURL)
  })
})