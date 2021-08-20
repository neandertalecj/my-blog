import { forwardRef } from 'react'

export const Button = forwardRef(({
  color='primary',
  children='Click',
  className='',
  ...props
}, ref) => (
  <button
    ref={ref}
    className={`${style.default} ${style.color[color]} ${className}`}
    {...props}
  >
    {children}
  </button>
))

/* You can replace those colors with your own*/
export const style = {
  default: `text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200`,
  color: {
    primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-100`,
    success: `bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100`,
    danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
    dark: `bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-100`,
    warning: `bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-100`,
    indigo: `bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100`,
  },
}
