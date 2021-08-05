import React from 'react'

/* Tab logic */
const style = {
  notSelected: `text-gray-800 border-b cursor-pointer`,
  default: `py-2 px-4 inline-block focus:outline-none`,
  selected: `border-gray-300 border-t bg-white border-b-0 border-l border-r text-blue-700`,
}

export const Tabs = ({ children }) => {
  const childrenArray = React.Children.toArray(children)
  const [current, setCurrent] = React.useState(childrenArray[0].key)

  const newChildren = childrenArray.map((child) =>
    React.cloneElement(child, { selected: child?.key === current }),
  )

  return (
    <nav>
      {childrenArray.map((child) => (
        <div
          role="link"
          tabIndex={0}
          onClick={() => setCurrent(child?.key)}
          key={child?.key}
          className={`${style.default} ${
            current === child?.key ? style.selected : style.notSelected
          }`}
        >
          {child?.props.title}
        </div>
      ))}
      <section>{newChildren}</section>
    </nav>
  )
}

export const Tab = ({ children, selected }) => {
  return (
    <div hidden={!selected} className="mt-4">
      {children}
    </div>
  )
}