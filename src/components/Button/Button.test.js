import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, style } from './Button'

const onClick = jest.fn()

describe('Button', () => {
  it('renders the button by default', () => {
    render(<Button />)

    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveClass(style.color.primary)
    expect(screen.getByText(/click/i)).toBeInTheDocument()
  })

  it('a sended "onClick" works', () => {
    render(<Button onClick={onClick} />)

    userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('custom colors works', () => {
    render(<Button color='dark' />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass(style.color.dark)

    render(<Button color='primary' />)
    expect(screen.getAllByRole('button')[1]).toHaveClass(style.color.primary)

    render(<Button color='success' />)
    expect(screen.getAllByRole('button')[2]).toHaveClass(style.color.success)
  })

  it('sended "ref" works', () => {
    const ref = React.createRef(null)
    
    render(<Button ref={ref} />)
    ref.current.focus()

    expect(screen.getByRole('button')).toHaveFocus()
  })
})