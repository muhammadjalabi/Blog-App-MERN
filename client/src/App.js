import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode'

import store from './store'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logout } from './actions/authentication_actions'

import LoginPage from './containers/auth/LoginPage'
import RegisterPage from './containers/auth/RegisterPage'

import ProgressBar from './containers/layout/ProgressBar'
import NavBar from './containers/layout/NavBar'

import Landing from './components/layout/Landing'
import BlogPage from './containers/BlogPage'
import PrivateRoute from './utils/PrivateRoute'

import ViewPostPage from './containers/posts/ViewPostPage'
import UpdatePostPage from './containers/posts/UpdatePostPage'
import CreatePostPage from './containers/posts/CreatePostPage'

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token)
  const decoded = jwt_decode(token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = './loginPage'
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ProgressBar />
        <NavBar />
        <Switch>
          <Route path='/' exact component={Landing} />

          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <PrivateRoute exact path='/blog' component={BlogPage} />
          <PrivateRoute exact path='/blog/post/create' component={CreatePostPage} />
          <PrivateRoute exact path='/blog/post/update/:id' component={UpdatePostPage} />
          <Route exact path='/blog/post:id' component={ViewPostPage} />
          <Route path='/blog/:author' component={BlogPage} />
          <Redirect from='*' to='/' />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
