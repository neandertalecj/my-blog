import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/rootReducer'
import store from './store'
import Home from './pages/home/Home'
import Blog from './pages/blog/Blog'
import Post from './pages/post/Post'
import SandBox from './pages/SandBox/SandBox'

import { withSuspense } from './utils/hoc/withSuspense'
import Auth from './pages/auth/Auth'
import { NavbarPage } from './components/header/Header'
import './App.css'

const NotFound = React.lazy(() => import('./pages/notFound/NotFound'))
const Account = React.lazy(() => import('./pages/Account/AccountPage/AccauntPage'))

const SuspendedNotFound = withSuspense(NotFound)
const SuspendedAccount = withSuspense(Account)


function App() {
  return (
    <div>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NavbarPage />

          <Switch>

            <Route exact path='/'>
              <Home />
            </Route>

            <Route exact path='/blog'>
              <Blog />
            </Route>

            <Route exact path="/blog/:id">
              <Post />
            </Route>

            <Route path='/login'>
              <Auth />
            </Route>

            <Route path='/account'>
              <SuspendedAccount />
            </Route>

            <Route path='/sanbox' render={() => <SandBox history={history} />} />

            <Route path='*'
              render={() => <SuspendedNotFound />}
            />

          </Switch>
        </ConnectedRouter>
      </Provider>
    </div>
  )
}

export default App
