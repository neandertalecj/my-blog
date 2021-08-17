import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutStart } from '../../store/auth/auth.actions'
import { Spinner } from '../Spinner'
import logo from '../../assets/images/logo.png'

export const NavbarPage = () => {
  const loginStatus = useSelector(state => state.auth.isLoggedIn)
  const initApp = useSelector(state => state.app.initApp)

  const dispatch = useDispatch()

  return (
    <Navbar datatestid="navbar" className="bg-white text-gray-600 z-50">
      <NavbarBrand to="/">
        <img
          src={logo}
          alt="Next.js"
          className="w-7 h-7 md:w-8 md:h-8"
        />
      </NavbarBrand>

      <NavbarToggler />

      <NavbarCollapse>
        <NavbarNav orientation="start">
          <NavbarItem>
            <NavbarLink to="/" datatestid="home-link">
              Neandertalecj
            </NavbarLink>
          </NavbarItem>
        </NavbarNav>

        {initApp && <NavbarNav orientation="end">
          <NavbarItem><NavbarLink to="/blog" data-testid="blog-link">Blog</NavbarLink></NavbarItem>

          {loginStatus && <NavbarItem to="/account"><NavbarLink to="/account" data-testid="account-link">Account</NavbarLink></NavbarItem>}

          {!loginStatus && <NavbarItem><NavbarLink to="/login" data-testid="login-link">Log in</NavbarLink></NavbarItem>}

          {loginStatus && <NavbarItem>
            <span onClick={() => dispatch(logoutStart())}>
              Log out
            </span>
          </NavbarItem>}
        </NavbarNav>}

        {!initApp && <NavbarNav orientation="end">
          <Spinner className="h-5" />
        </NavbarNav>}

      </NavbarCollapse>

    </Navbar>
  )
}

/* Navbar logic */
const style = {
  navbar: `fixed px-4 py-2 shadow top-0 w-full lg:flex lg:flex-row lg:items-center lg:justify-start lg:relative`,
  brand: `cursor-pointer font-bold inline-block mr-4 py-1.5 text-2xl whitespace-nowrap hover:text-gray-200`,
  toggler: `block float-right text-4xl lg:hidden focus:outline-none focus:shadow`,
  item: `whitespace-pre cursor-pointer px-4 py-3 hover:text-gray-200`,
  collapse: {
    default: `border-t border-gray-200 fixed left-0 z-10000 mt-2 shadow py-2 text-center lg:border-none lg:flex lg:flex-grow lg:items-center lg:mt-0 lg:py-0 lg:relative lg:shadow-none`,
    open: `h-auto visible transition-all duration-500 ease-out w-full opacity-100 lg:transition-none`,
    close: `h-auto invisible w-0 transition-all duration-300 ease-in lg:opacity-100 lg:transition-none lg:visible`,
  },
  nav: {
    start: `block mb-0 mr-auto pl-0 lg:flex lg:mb-0 lg:pl-0`,
    middle: `block mb-0 ml-auto pl-0 lg:flex lg:pl-0 lg:mb-0 lg:mx-auto`,
    end: `block pl-0 mb-0 ml-auto lg:flex lg:pl-0 lg:mb-0`,
  },
}

const Context = React.createContext({})

const Navbar = ({ children, className, datatestid }) => {
  const [open, setOpen] = React.useState(false);
  const navbarRef = React.useRef(null);
  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // close navbar on click outside when viewport is less than 1024px
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (window.innerWidth < 1024) {
        if (!navbarRef.current?.contains(event.target)) {
          if (!open) return;
          setOpen(false);
        }
      }
    }
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [open, navbarRef])
  
  return (
    <Context.Provider value={{ open, toggle }}>
      <nav ref={navbarRef} className={`${className} ${style.navbar}`} data-testid={datatestid}>
        {children}
      </nav>
    </Context.Provider>
  )
}

const useToggle = () => React.useContext(Context)

/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
const NavbarBrand = ({ children, to }) => (
  <Link to={to} className={style.brand} >
    <strong>{children}</strong>
  </Link>
)

const NavbarToggler = () => {
  const { toggle } = useToggle();
  return (
    <button
      type="button"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className={style.toggler}
      onClick={toggle}
    >
      &#8801;
    </button>
  )
}

const NavbarCollapse = ({ children }) => {
  const { open } = useToggle();
  return (
    <div
      style={{ backgroundColor: 'inherit' }}
      className={`${style.collapse.default}
        ${open ? style.collapse.open : style.collapse.close}`}
    >
      {children}
    </div>
  )
}

const NavbarNav = ({ children, orientation }) => (
  <ul className={style.nav[orientation]}>{children}</ul>
)

const NavbarItem = ({ children }) => <li className={style.item}>{children}</li>

/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
const NavbarLink = ({ children, to, active, activeClass }) => (
  <Link to={to} className={active ? activeClass : ''}>
    {children}
  </Link>
)